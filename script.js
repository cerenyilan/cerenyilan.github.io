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
   3. SCROLL REVEAL ANİMASYONU (YENİ KAVRAM: Intersection Observer)

   Ne işe yarar? Bir elemanın "ekranda görünüp görünmediğini" takip eder.
   Normalde bunu anlamak için sürekli "sayfa ne kadar kaydırıldı" hesabı
   yapmak gerekirdi (yavaş ve karmaşık). IntersectionObserver bunu bizim
   yerimize, tarayıcının kendi optimize ettiği şekilde yapar.

   Mantık:
   1. Bir "gözlemci" (observer) oluşturuyoruz, ona "bir eleman görününce
      şu fonksiyonu çalıştır" diyoruz.
   2. Hangi elemanları izleyeceğini söylüyoruz (class="reveal" olanlar).
   3. Eleman ekrana girince, üzerine "gorunur" class'ı ekliyoruz -
      CSS'teki .reveal.gorunur kuralı devreye girip yumuşak bir
      belirme animasyonu oynatıyor.
   ============================================ */

const gozlemci = new IntersectionObserver(function (girisler) {
    // "girisler" -> izlenen elemanlardan hangilerinin durumu değiştiği bilgisi

    girisler.forEach(function (giris) {
        // giris.isIntersecting -> true ise eleman şu an ekranda görünüyor demek
        if (giris.isIntersecting) {
            giris.target.classList.add("gorunur");
            // giris.target -> ekrana giren asıl HTML elemanı
        }
    });
}, {
    threshold: 0.15
    // threshold: 0.15 -> elemanın en az %15'i görününce tetiklen
});

const gorunecekElemanlar = document.querySelectorAll(".reveal");
// querySelectorAll -> class="reveal" olan TÜM elemanları bir liste olarak getirir

gorunecekElemanlar.forEach(function (eleman) {
    gozlemci.observe(eleman);
    // Her birini gözlemciye "izle bunu" diye kaydediyoruz
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
