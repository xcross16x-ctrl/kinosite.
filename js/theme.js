const themeButton = document.querySelector("header_theme");

const THEME_KEY = "kinoposite_theme";

const saveTheme = localStorage.getItem(THEME_KEY);

if(savedTheme === "dark"){
    document.body.classList.add("dark-theme");
}
if(themeButton){
    themeButton.addEventListener("click",()=>{
        document.body.classList.toggle
        ("dark-theme");
        const isDarkTheme = document.body.classList.
        contains("dark-theme");
        if(isDarkTheme){
            localStorage.setItem(THEME_KEY, "dark");
        }else{
            localStorage.setItem(THEME_KEY, "light");
        }
    });
}