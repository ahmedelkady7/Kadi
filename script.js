// تكوين Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAI21TvGX8jjTbEIDww5GEKcxM9zL6Gkn8",
    authDomain: "ak-sport-a985e.firebaseapp.com",
    databaseURL: "https://ak-sport-a985e-default-rtdb.firebaseio.com",
    projectId: "ak-sport-a985e",
    storageBucket: "ak-sport-a985e.appspot.com",
    messagingSenderId: "922662521404",
    appId: "1:922662521404:web:be257019ae9c69f6ddd139"
};

// تحقق من تحميل Firebase قبل التهيئة
if (typeof firebase !== "undefined") {
    firebase.initializeApp(firebaseConfig);
    const db = firebase.database();
    console.log("✅ Firebase Initialized Successfully");
} else {
    console.error("❌ خطأ: Firebase لم يتم تحميله بشكل صحيح!");
}

// تحميل البيانات من Firebase
function loadContent(ref, listId) {
    if (!db) {
        console.error("❌ خطأ: قاعدة البيانات غير معرفة!");
        return;
    }
    
    db.ref(ref).once("value")
        .then((snapshot) => {
            let data = snapshot.val();
            let list = document.getElementById(listId);
            if (!list) {
                console.error(`❌ خطأ: العنصر ${listId} غير موجود في HTML!`);
                return;
            }
            list.innerHTML = "";
            for (let key in data) {
                let item = data[key];
                let element = `<div class="card" onclick="watch('${item.link}')">
                                <img src="${item.img || 'default-thumbnail.jpg'}" alt="${item.name}">
                                <p>${item.name}</p>
                            </div>`;
                list.innerHTML += element;
            }
        })
        .catch((error) => console.error("❌ خطأ في جلب البيانات:", error));
}

// فتح البث المباشر
function watch(link) {
    if (link) {
        window.open(link, "_blank");
    } else {
        console.error("❌ خطأ: الرابط غير متوفر!");
    }
}

// البحث عن المحتوى
function filterContent() {
    let input = document.getElementById("searchInput");
    if (!input) {
        console.error("❌ خطأ: عنصر البحث غير موجود!");
        return;
    }

    let value = input.value.toLowerCase();
    let items = document.getElementsByClassName("card");
    for (let item of items) {
        let name = item.getElementsByTagName("p")[0].innerText.toLowerCase();
        item.style.display = name.includes(value) ? "block" : "none";
    }
}

// تحميل البيانات عند تشغيل الصفحة
window.onload = function () {
    console.log("🔄 جاري تحميل البيانات...");
    loadContent("ak_tv_2", "channelsList");
    loadContent("film", "moviesList");
    loadContent("live_streams", "liveList");
};
