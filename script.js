async function translateText() {


    const text = document
        .getElementById("inputText")
        .value
        .trim();


    const selectedStyle = document.querySelector(
        'input[name="style"]:checked'
    );


    const result = document.getElementById("result");



    if(!text){

        alert("Enter a sentence!");

        return;

    }



    if(!selectedStyle){

        alert("Choose a style!");

        return;

    }



    const style = selectedStyle.value;



    result.innerHTML = "✨ AI is thinking...";



    const prompt = `

Transform this sentence:

"${text}"

into this style:

${style}


Make it creative, funny and entertaining.

`;



try {


const response = await fetch(

"https://api.groq.com/openai/v1/chat/completions",

{

method:"POST",

headers:{

"Content-Type":"application/json",

"Authorization":"Bearer UR_grok_api"

},


body:JSON.stringify({

model:"llama-3.1-8b-instant",

messages:[

{

role:"system",

content:"You are a creative AI personality translator."

},

{

role:"user",

content:prompt

}

],


temperature:0.8


})


}

);



const data = await response.json();



console.log(data);



if(!response.ok){

result.innerHTML="❌ "+data.error.message;

return;

}



const answer =
data.choices[0].message.content;



result.innerHTML=`

<div class="card">

<h3>${style}</h3>

<p>${answer}</p>

</div>

`;



}

catch(error){

console.log(error);

result.innerHTML="❌ Something went wrong.";

}


}