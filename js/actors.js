const param = new URLSearchParams(window.location.search);
const filmId = param.get("filmId");
const actorId = param.get("actorId");

const actorsList = document.querySelector(".actors-list");
const searchInput = document.querySelector(".actors_search-input");
const modal = document.querySelector(".actor_modal");
const modalContent = document.querySelector(".actor_modal-content");
const modalTemplate = document.querySelector(".actor_modal-template").cloneNode(true);
const modalClose = document.querySelector(".actor_modal-close");
const historyList = document.querySelector(".actors_history");
const actorsPrevButton = document.querySelector(".actors_pagination-prev");
const actorsNextButton = document.querySelector(".actors_pagination-next");
const actorsPageText = document.querySelector(".actors_pagination-page");

const HISTORY_KEY = "kinosite_actors_history";

let actors = [];
let filteredactors = [];

let actorsPage = 1;
const actorsPerPage = 10;

// Функция загрузки актеров из API
async function loadActors() {
    if(!filmId){
        actorsList.innerHTML = "<p>Фильм не выбран</p>";
        return;
    }
    actorsList.innerHTML = "<p>Загрузка актеров...</p>";
    try {
        const response = await fetch(
            `https://kinopoiskapiunofficial.tech/api/v1/staff?filmId=${filmId}`,
            {
                method: "GET",
                headers: {
                    "X-API-KEY": API_KEY,
                    "Content-Type": "application/json",
                },
            }
        );
        if(!response.ok){
            throw new Error("Ошибка API: " + response.status);
        }
        const data = await response.json();
        actors = data.filter(function(person){
            return person.professionKey === "ACTOR";
        });
        filteredactors = [];
        actorsPage = 1;
        showActors();
        if(actorId){
            showActorInfo(actorId);
        }
    } catch (error) {
        actorsList.innerHTML = "<p>Не удалось загрузить актеров</p>";
        console.error(error);
    }
}
// Функция отображения актеров на странице
function showActors(){
    actorsList.innerHTML = "";
    const searchValue = searchInput.value.trim();
    const list = searchValue ? filteredactors :actors;
    if(list.length === 0){
        actorsList.innerHTML = "<p>Актеры не найдены</p>";
        actorsPageText.textContent = "1";
        actorsPrevButton.disabled = true;
        actorsNextButton.disabled = true;
        return;
    }
    const start = (actorsPage - 1) * actorsPerPage;
    const end = start + actorsPerPage;
    const actorsPageItems = list.slice(start, end);
}