/* ============================================
   1. ELEMANLARI SEÇME
   Önce HTML'deki elemanlara "erişmemiz" gerekiyor ki onlarla
   bir şey yapabilelim. document.getElementById(), id'si verilen
   elemanı bulup bize verir.
   ============================================ */
const temaButonu = document.getElementById("tema-butonu");
const govde = document.body;
// document.body -> sayfadaki <body> etiketinin kendisi

/* ============================================
   2. OLAY DİNLEYİCİ (EVENT LISTENER) EKLEME
   "temaButonu'na TIKLANDIĞINDA, şu fonksiyonu çalıştır" diyoruz.
   ============================================ */
temaButonu.addEventListener("click", function () {

    // classList.toggle() -> eğer o class VARSA kaldırır, YOKSA ekler.
    // Yani her tıklamada "karanlik-mod" class'ı açılıp kapanacak.
    govde.classList.toggle("karanlik-mod");

    // Şimdi butonun YAZISINI da duruma göre değiştirelim.
    // classList.contains() -> o class şu an var mı, yok mu, kontrol eder (true/false döner)
    if (govde.classList.contains("karanlik-mod")) {
        temaButonu.textContent = "☀️ Aydınlık Mod";
        // Karanlık moddaysak, butonda "Aydınlık Mod'a geç" seçeneği görünsün
    } else {
        temaButonu.textContent = "🌙 Karanlık Mod";
        // Aydınlık moddaysak, butonda "Karanlık Mod'a geç" seçeneği görünsün
    }

});

/* ============================================
   BONUS: TARAYICI HAFIZASINDA SAKLAMA (localStorage)
   Şu an, sayfayı yenilediğinde (F5) seçtiğin tema unutuluyor,
   hep aydınlık modda açılıyor. localStorage kullanarak tarayıcıya
   "bu kullanıcı karanlık modu seçmişti" diye not bırakabiliriz.

   Bu kısmı şimdilik YORUM SATIRI (comment) olarak bırakıyorum -
   önce yukarıdaki temel mantığı oturt, istersen sonra bunu da
   birlikte aktif ederiz. Yorum satırındaki kod ÇALIŞMAZ, sadece
   referans olsun diye burada duruyor.

   localStorage.setItem("tema", "karanlik");           // kaydetme
   let kayitliTema = localStorage.getItem("tema");       // okuma
============================================ */
