document.addEventListener("DOMContentLoaded", () => {
    // 1. استدعاء العناصر من صفحة الـ HTML لكي نتحكم بها
    const searchBar = document.getElementById("searchBar");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const mediaCards = document.querySelectorAll(".media-card");
    const lightbox = document.getElementById("imageLightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const closeLightbox = document.querySelector(".close-lightbox");

    // ======================================================
    // الوظيفة الأولى: نظام البحث الذكي وفلترة الفيديوهات والصور
    // ======================================================
    function filterContent() {
        // تحويل النص المكتوب في البحث لحروف صغيرة لتجنب الأخطاء
        const searchText = searchBar.value.toLowerCase();
        // معرفة الزر النشط حالياً (الكل، فيديو، صور)
        const activeFilter = document.querySelector(".filter-btn.active").getAttribute("data-target");

        // المرور على كل كارت ميديا في المنصة وفحصه
        mediaCards.forEach(card => {
            const cardTitle = card.querySelector("h3").textContent.toLowerCase();
            const cardDescription = card.querySelector("p").textContent.toLowerCase();
            const cardType = card.getAttribute("data-type");

            // هل النص المكتوب موجود في العنوان أو الوصف؟
            const matchesSearch = cardTitle.includes(searchText) || cardDescription.includes(searchText);
            // هل الكارت يتطابق مع الزر المضغوط (فيديو أو صورة أو الكل)؟
            const matchesFilter = activeFilter === "all" || cardType === activeFilter;

            // إذا تحقق الشرطان، يظهر الكارت للزائر، وإذا لم يتحققا يختفي
            if (matchesSearch && matchesFilter) {
                card.style.display = "block"; 
            } else {
                card.style.display = "none"; 
            }
        });
    }

    // تشغيل الفلترة تلقائياً فور قيام المستخدم بالكتابة في مربع البحث
    searchBar.addEventListener("input", filterContent);

    // تشغيل الفلترة عند الضغط على أزرار (الكل - فيديوهات - صور)
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // إزالة اللون الأخضر من الزر القديم وإضافته للزر الجديد الذي تم الضغط عليه
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            
            // تحديث عرض الكروت بناءً على الفلتر الجديد
            filterContent(); 
        });
    });

    // ======================================================
    // الوظيفة الثانية: نظام فتح وتكبير الصور بشكل سينمائي
    // ======================================================
    mediaCards.forEach(card => {
        const img = card.querySelector(".card-media-img");
        // التأكد أولاً أن الكارت يحتوي على صورة وليس فيديو
        if (img) {
            // جعل شكل الماوس يتحول ليد عند الوقوف على الصورة
            img.style.cursor = "pointer"; 
            
            // عند الضغط على الصورة، تفتح النافذة السوداء الكبيرة وتظهر الصورة بداخلها
            img.addEventListener("click", () => {
                lightbox.style.display = "flex";
                lightboxImg.src = img.src; 
            });
        }
    });

    // إغلاق النافذة الكبيرة عند الضغط على علامة (X)
    closeLightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    // إغلاق النافذة أيضاً لو ضغط المستخدم في أي مكان فارغ أسود خارج الصورة
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });
});
document.addEventListener("DOMContentLoaded", () => {
    // استدعاء عناصر الواجهة
    const searchBar = document.getElementById("searchBar");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const mediaCards = document.querySelectorAll(".media-card");
    const lightbox = document.getElementById("imageLightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const closeLightbox = document.querySelector(".close-lightbox");
    
    // عناصر ميزة الوضع الليلي والنهاري
    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");

    // ======================================================
    // 1. منطق الوضع الليلي والنهاري (Theme Toggle)
    // ======================================================
    // التحقق من وجود وضع محفوظ مسبقاً في متصفح الزائر
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        bodyActiveLight();
    }

    themeToggle.addEventListener("click", () => {
        if (document.body.classList.contains("light-theme")) {
            bodyActiveDark();
        } else {
            bodyActiveLight();
        }
    });

    function bodyActiveLight() {
        document.body.classList.add("light-theme");
        themeIcon.classList.replace("fa-moon", "fa-sun"); // تحويل الأيقونة لشمس
        localStorage.setItem("theme", "light"); // حفظ الخيار
    }

    function bodyActiveDark() {
        document.body.classList.remove("light-theme");
        themeIcon.classList.replace("fa-sun", "fa-moon"); // تحويل الأيقونة لقمر
        localStorage.setItem("theme", "dark"); // حفظ الخيار
    }

    // ======================================================
    // 2. نظام البحث الذكي وفلترة الفيديوهات والصور
    // ======================================================
    function filterContent() {
        const searchText = searchBar.value.toLowerCase();
        const activeFilter = document.querySelector(".filter-btn.active").getAttribute("data-target");

        mediaCards.forEach(card => {
            const cardTitle = card.querySelector("h3").textContent.toLowerCase();
            const cardDescription = card.querySelector("p").textContent.toLowerCase();
            const cardType = card.getAttribute("data-type");

            const matchesSearch = cardTitle.includes(searchText) || cardDescription.includes(searchText);
            const matchesFilter = activeFilter === "all" || cardType === activeFilter;

            if (matchesSearch && matchesFilter) {
                card.style.display = "block"; 
            } else {
                card.style.display = "none"; 
            }
        });
    }

    searchBar.addEventListener("input", filterContent);

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            filterContent(); 
        });
    });

    // ======================================================
    // 3. نظام تكبير الصور الاحترافي (Lightbox)
    // ======================================================
    mediaCards.forEach(card => {
        const img = card.querySelector(".card-media-img");
        if (img) {
            img.style.cursor = "pointer"; 
            img.addEventListener("click", () => {
                lightbox.style.display = "flex";
                lightboxImg.src = img.src; 
            });
        }
    });

    closeLightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
        }
    });
});
// تسجيل الـ Service Worker لتفعيل ميزة التثبيت كتطبيق موبايل وسطح مكتب
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js")
    .then(() => console.log("تم تفعيل نظام تطبيق الموبايل بنجاح! 📱"))
    .catch((err) => console.log("حدث خطأ في تفعيل التطبيق:", err));
}
