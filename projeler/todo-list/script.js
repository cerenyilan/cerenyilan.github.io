/* ============================================
   1. VERİYİ TUTACAK DİZİ (ARRAY)
   Bir dizi, birden fazla değeri TEK bir kutuda tutmamızı sağlar.
   Her görevi bir "obje" ({ } süslü parantez) olarak saklıyoruz,
   çünkü her görevin birden fazla bilgisi var: metni ve tamamlanma durumu.
   ============================================ */
let gorevler = [];
// Örnek nasıl görünecek, ekleme yaptıkça:
// gorevler = [
//     { metin: "Süt al", tamamlandi: false },
//     { metin: "Ödev yap", tamamlandi: true }
// ];

/* ============================================
   2. HTML ELEMANLARINI SEÇME
   ============================================ */
const input = document.getElementById("gorev-input");
const ekleButonu = document.getElementById("ekle-butonu");
const liste = document.getElementById("gorev-listesi");
const bosMesaji = document.getElementById("bos-mesaji");

/* ============================================
   3. GÖREV EKLEME FONKSİYONU
   ============================================ */
function gorevEkle() {
    const metin = input.value.trim();
    // .trim() -> baştaki/sondaki boşlukları temizler
    // (örn: kullanıcı yanlışlıkla sadece boşluk tuşuna basmış olabilir)

    if (metin === "") {
        // Kullanıcı boş bir görev eklemeye çalışıyorsa hiçbir şey yapma
        return;
        // "return" bir fonksiyonu ORADA durdurur, altındaki kod çalışmaz
    }

    // Diziye YENİ bir görev objesi ekliyoruz
    gorevler.push({ metin: metin, tamamlandi: false });
    // .push() -> dizinin SONUNA yeni bir eleman ekler

    input.value = "";
    // Kullanıcı ekleyince input kutusunu temizliyoruz, tekrar yazabilsin

    listeyiCiz();
    // Az sonra tanımlayacağımız fonksiyon - ekrandaki listeyi günceller
}

/* ============================================
   4. LİSTEYİ EKRANA ÇİZME (RENDER)
   Bu fonksiyonun mantığı: "gorevler dizisinde ne varsa, ekranda
   TAM OLARAK onu göster." Her çağrıldığında listeyi SIFIRDAN yeniden
   çizer - bu, DOM'la çalışmanın çok yaygın bir yöntemidir.
   ============================================ */
function listeyiCiz() {
    liste.innerHTML = "";
    // innerHTML = "" -> listenin İÇİNİ tamamen boşaltır,
    // sıfırdan yeniden dolduracağız

    if (gorevler.length === 0) {
        // .length -> dizide kaç eleman olduğunu verir
        bosMesaji.classList.remove("gizli");
        // Dizi boşsa "henüz görev yok" mesajını GÖSTER
    } else {
        bosMesaji.classList.add("gizli");
        // Dizide en az 1 görev varsa mesajı GİZLE
    }

    gorevler.forEach(function (gorev, index) {
        // forEach -> dizideki HER eleman için bu fonksiyonu çalıştırır
        // "gorev" -> o anki görev objesi, "index" -> dizideki sıra numarası (0, 1, 2...)

        // Her görev için bir <li> elemanı JavaScript ile OLUŞTURUYORUZ
        const satir = document.createElement("li");
        satir.className = "gorev-satiri" + (gorev.tamamlandi ? " tamamlandi" : "");
        // Görev tamamlandıysa "tamamlandi" class'ını da ekliyoruz (CSS bunu üstü çizili gösterecek)

        // .innerHTML ile satırın İÇİNİ dolduruyoruz.
        // data-index="${index}" -> bu satırın dizideki HANGİ görev
        // olduğunu HTML üzerinde saklıyoruz, silme/tamamlama işleminde
        // "hangi görevden bahsediyoruz" diye bunu okuyacağız.
        satir.innerHTML = `
            <button class="tamamla-butonu" data-index="${index}">
                ${gorev.tamamlandi ? "↺" : "✓"}
            </button>
            <span class="gorev-metni">${gorev.metin}</span>
            <button class="sil-butonu" data-index="${index}">✕</button>
        `;

        liste.appendChild(satir);
        // appendChild -> oluşturduğumuz satırı listenin SONUNA ekler
    });
}

/* ============================================
   5. OLAY DİNLEYİCİLER (EVENT LISTENERS)
   ============================================ */

// "Ekle" butonuna tıklanınca
ekleButonu.addEventListener("click", gorevEkle);

// Kullanıcı input'a yazıp Enter tuşuna basınca da eklensin istiyoruz
input.addEventListener("keydown", function (olay) {
    // olay.key -> hangi tuşa basıldığını verir
    if (olay.key === "Enter") {
        gorevEkle();
    }
});

/* ============================================
   6. OLAY DELEGASYONU (EVENT DELEGATION) - ÖNEMLİ KAVRAM

   Sorun: "Tamamla" ve "Sil" butonları henüz sayfa açılırken YOK -
   onları listeyiCiz() fonksiyonu SONRADAN oluşturuyor. JavaScript'e
   "o butonlara tıklanınca şunu yap" diye tek tek dinleyici EKLEYEMEYİZ,
   çünkü onlar daha var olmadan kod çalışıyor.

   Çözüm: Dinleyiciyi hiç değişmeyen bir üst elemana (liste'nin
   kendisine) koyuyoruz. Tıklama, önce iç elemana sonra dışarıya doğru
   "yayılır" (bubbling denir) - biz bunu dış elemanda YAKALIYORUZ.
   ============================================ */
liste.addEventListener("click", function (olay) {
    const tiklananButon = olay.target;
    // olay.target -> gerçekte TIKLANAN eleman (buton, span, ne ise)

    if (tiklananButon.classList.contains("tamamla-butonu")) {
        const index = tiklananButon.dataset.index;
        // dataset.index -> HTML'deki data-index="..." değerini okur
        gorevler[index].tamamlandi = !gorevler[index].tamamlandi;
        // "!" -> tam tersi yapar (true ise false, false ise true) - yani AÇMA/KAPAMA
        listeyiCiz();
    }

    if (tiklananButon.classList.contains("sil-butonu")) {
        const index = tiklananButon.dataset.index;
        gorevler.splice(index, 1);
        // splice(index, 1) -> dizeden, o index'teki 1 elemanı ÇIKARIR
        listeyiCiz();
    }
});

/* ============================================
   İLK ÇALIŞTIRMA
   Sayfa ilk açıldığında listeyi bir kere çizdiriyoruz (o an dizi boş
   olduğu için sadece "boş mesajı" görünecek).
   ============================================ */
listeyiCiz();
