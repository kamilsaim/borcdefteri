// delete-account: kullanıcının kendi hesabını ve tüm borç/alacak verilerini siler.
// verify_jwt=true ile korunur -> yalnızca giriş yapmış kullanıcı, yalnızca KENDİ hesabını silebilir.
// Service role anahtarı sadece burada (sunucuda) kullanılır, istemciye asla verilmez.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Yetkilendirme yok" }), { status: 401, headers: { ...cors, "Content-Type": "application/json" } });
    }

    const url = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Çağıran kullanıcıyı, gönderdiği token üzerinden doğrula.
    const userClient = createClient(url, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: userErr } = await userClient.auth.getUser();
    if (userErr || !user) {
      return new Response(JSON.stringify({ error: "Geçersiz oturum" }), { status: 401, headers: { ...cors, "Content-Type": "application/json" } });
    }

    const uid = user.id;
    const admin = createClient(url, serviceKey);

    // Kişisel veriler — hepsi user_id'ye bağlı, topluluk içeriği yok.
    await admin.from("borc_payments").delete().eq("user_id", uid);
    await admin.from("borc_debts").delete().eq("user_id", uid);
    await admin.from("borc_people").delete().eq("user_id", uid);
    await admin.from("borc_ayarlar").delete().eq("user_id", uid);

    const { error: delErr } = await admin.auth.admin.deleteUser(uid);
    if (delErr) throw delErr;

    return new Response(JSON.stringify({ success: true }), { headers: { ...cors, "Content-Type": "application/json" } });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e?.message ?? e) }), { status: 500, headers: { ...cors, "Content-Type": "application/json" } });
  }
});
