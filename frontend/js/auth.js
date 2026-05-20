document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const loginValue = document.getElementById('login').value;
    const passwordValue = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMsg');

    const loginData = {
        login: loginValue,
        password: passwordValue
    };

    try{
        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        if(response.ok){
            const data = await response.json();
            const token = data.token;
            localStorage.setItem('token', token);
            window.location.href = 'template.html';
        }
        else{
            errorMessage.innerText = 'Usuário ou senha inválidos!';
        }
    }
    catch(error){
        console.error('Erro ao conectar com o servidor:', error);
        errorMessage.innerText = 'Erro ao conectar com o servidor. Tente mais tarde.';
    }
})