const Button = document.getElementById("get-weather");
Button.addEventListener("click", () => {
    let cityCode = document.getElementById("city-select").value;
    //都市を選択するプルダウンメニューから選択された値(value)を取得
    if(cityCode === "") {
        // cityCodeが空の時
        alert("都市を選択してください");
        return;
    }
    let url = `https://www.jma.go.jp/bosai/forecast/data/forecast/${cityCode}.json`;
    fetch(url)
    //指定したURLにリクセストを送ってデータを取得しろって命令
    .then(function (response) {
        // fetchがtrueかどうかはresponse.okで判断する
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("天気情報の取得に失敗しました");
            // .catchに飛ぶようになる
        }
    })
    .then(function (weather) {
        let area = weather[0].timeSeries[0].areas[0];
        let tempsArea = weather[1].tempAverage.areas[0];

        document.getElementById("publishingOffice").textContent = weather[0].publishingOffice;
        document.getElementById("reportDatetime").textContent = weather[0].reportDatetime;
        document.getElementById("targetArea").textContent = area.area.name;
        document.getElementById("todayHighTemperature").textContent = tempsArea.max + "°C";
        document.getElementById("todayLowTemperature").textContent =tempsArea.min + "°C";
        document.getElementById("today").textContent = area.weathers[0];
        document.getElementById("tomorrow").textContent = area.weathers[1];
        document.getElementById("dayAfterTomorrow").textContent = area.weathers[2];
    });
    // .catch(function (error) {
    //     alert(error.message);
    // });
});
