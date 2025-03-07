const db = firebase.database().ref("channels");
db.once("value")
    .then(snapshot => {
        const data = snapshot.val();
        if (!data) {
            alert("لا توجد بيانات!");
            return;
        }
        const list = document.getElementById("channelList");
        list.innerHTML = "";
        Object.keys(data).forEach(key => {
            const item = data[key];
            const li = document.createElement("li");
            li.innerHTML = `<img src="${item.img}" alt="${item.name}"><span>${item.name}</span>`;
            li.onclick = () => playStream(item);
            list.appendChild(li);
        });
    });

function playStream(channel) {
    document.getElementById("videoPlayer").src = channel.url;
    document.getElementById("channelImage").src = channel.img;
    document.getElementById("channelName").textContent = channel.name;
}