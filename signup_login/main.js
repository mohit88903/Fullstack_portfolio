const formEl = document.querySelector('.form');
formEl.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(formEl);
  const data = Object.fromEntries(formData);
  console.log(data);

  fetch('https://localhost:7231/api/PostNewsignup',{
      method: 'POST',
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify(data)

  }).then(res => {
    reset();
    res.json()
  
  })
  .then(data =>
    {
      console.log(data);
      GetAllStudents();
      reset();
    }
    )
  .catch(error => console.log(error));
});
//form reset
function reset(){
  formEl.reset();
}

function login(){

  var userName = document.getElementById("loginusername").value;
  var password = document.getElementById("loginuserpassword").value;

  //fetch("https://localhost:7110/api/login?username="+userName+"&password="+password+"")
  fetch("https://localhost:7231/api/login?username="+userName+"&password="+password+"")

  .then((data) =>{
    
    return data.json();
     
  }).then((objectData)=>{
    
    if(objectData.id >0)
{
location.href="crud_operation.html";
}else{
alert('wrong username or password')
}
    });
  }