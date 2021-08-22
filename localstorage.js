//（初期）変数定義

//localStorage.clear();

//（初期）日付の変数
let today = new Date();
today = today.toDateString();

let dt = new Date();
let key = '';


//（初期）DBのKeyセット, setItemは初回のみ必要
let anger = '';
//localStorage.setItem(`anger${today}`,0);

let sad = '';
//localStorage.setItem(`sad${today}`,0);

let hard = '';
//localStorage.setItem(`hard${today}`,0);

let happy = '';
//localStorage.setItem(`happy${today}`,0);

let fun = '';
//localStorage.setItem(`fun${today}`,0);

//（初期）memoのKeyセット
let memo__key = '';
let memo__text = '';

//画像をクリックして値を取得

$("#anger").on('click',()=>{
    anger = localStorage.getItem(`anger${today}`);
    anger++;
    localStorage.setItem(`anger${today}`,anger);
    swal('深呼吸してみよう😮‍💨');
});

$("#sad").on('click',()=>{
    sad = localStorage.getItem(`sad${today}`);
    sad++;
    localStorage.setItem(`sad${today}`,sad);
    swal('大丈夫？🥺');
});

$("#hard").on('click',()=>{
    hard = localStorage.getItem(`hard${today}`);
    hard++;
    localStorage.setItem(`hard${today}`,hard);
    swal('無理しすぎないでね😢');
});

$("#happy").on('click',()=>{
    happy = localStorage.getItem(`happy${today}`);
    happy++;
    localStorage.setItem(`happy${today}`,happy);
    swal('良いことがあったんだね！😆');
});

$("#fun").on('click',()=>{
    fun = localStorage.getItem(`fun${today}`);
    fun++;
    localStorage.setItem(`fun${today}`,fun);
    swal('楽しいのが一番😁');
});

//テキストをLocalStrorageに登録する
$("#memo__btn").on('click',()=>{
    memo__key = $('#memo__key').val();
    memo__text = $('#memo__text').val();
    localStorage.setItem(`${memo__key}${today}memo` , memo__text);
    swal('保存しました');
});


//選択した期間ごとにDBに登録した値を取得
//感情の配列
const emotion__all = ['anger', 'sad', 'hard', 'happy','fun'];
let periond = '';

let anger__sum = '';
let sad__sum = '';
let hard__sum = '';
let happy__sum = '';
let fun__sum = '';

let anger__memo = '';
let sad__memo = '';
let hard__memo = '';
let happy__memo = '';
let fun__memo = '';

$('#btn').on('click',()=>{

for(let e = 0; e < emotion__all.length; e++){

let emotion = emotion__all[e];
let emotion__first = `${emotion}__first`;
let emotion__next = `${emotion}__next`;
let emotion__sum = `${emotion}__sum`;
let emotion__memo = `${emotion}__memo`;
let memo__draft = '';
let memo__array = [];

emotion__first = '';
emotion__next = '';
emotion__sum = '';
emotion__memo = [];

//期間条件分岐
if(type.value === 'month'){
    period = 32;
}
if(type.value === 'week'){
    period = 8;
}
if(type.value === 'yesterday'){
    period = 2;
}
if(type.value === ''){
    swal('期間を選んでください');
}

//1週間の場合
for(let i = 0; i < period; i++){

    //まず期間を取得
    let dt = new Date();
    dt.setDate(dt.getDate()-i);
    key =dt.toDateString();
    
    if(i === 0){
        emotion__first = localStorage.getItem(emotion + key);
        emotion__sum = Number(emotion__first);
    }else{
        emotion__next = localStorage.getItem(emotion + key);
        emotion__next = Number(emotion__next);
        emotion__sum = emotion__sum + emotion__next;
    }

    memo__draft = localStorage.getItem(emotion + key + 'memo');
    if(!(memo__draft === '')){
        memo__array.push(memo__draft);
    }
}
emotion__memo = memo__array.filter(Boolean);

if(emotion === 'anger'){
    anger__sum = emotion__sum;
    anger__memo = emotion__memo;
}
if(emotion === 'sad'){
    sad__sum = emotion__sum;
    sad__memo = emotion__memo;
}
if(emotion === 'hard'){
    hard__sum = emotion__sum;
    hard__memo = emotion__memo;
}
if(emotion === 'happy'){
    happy__sum = emotion__sum;
    happy__memo = emotion__memo;
}
if(emotion === 'fun'){
    fun__sum = emotion__sum;
    fun__memo = emotion__memo;
}

}

console.log(`angerの合計は${anger__sum}`);
console.log(`sadの合計は${sad__sum}`);
console.log(`hardの合計は${hard__sum}`);
console.log(`happyの合計は${happy__sum}`);
console.log(`funの合計は${fun__sum}`);

console.log(`angerのmemoは${anger__memo}`);
console.log(`sadのmemoは${sad__memo}`);
console.log(`hardのmemoは${hard__memo}`);
console.log(`happyのmemoは${happy__memo}`);
console.log(`funのmemoは${fun__memo}`);

//結果グラフ作成
var ctx = document.getElementById("myPieChart");
var myPieChart = new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ["怒り", "悲しい", "辛い", "嬉しい","楽しい"],
    datasets: [{
        backgroundColor: [
            "#BB5179",
            "#FAFF67",
            "#58A27C",
            "#3C00FF",
            "#FF9999"
        ],
        data: [anger__sum, anger__sum, hard__sum, happy__sum, fun__sum]
    }]
  },
  options: {
    title: {
      display: true,
      text: '感情グラフ'
    }
  }
});

const html = `
    <li>${anger__memo}</li>
    <li>${sad__memo}</li>
    <li>${hard__memo}</li>
    <li>${happy__memo}</li>
    <li>${fun__memo}</li>
`;

$('#memo__list').append(html);

$('.wrapper__third').show();

});