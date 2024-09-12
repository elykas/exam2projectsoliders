const form = document.getElementsByClassName("form-div")[0];


form.addEventListener("submit", (event) => {
    event.preventDefault();
debugger
    const fullName = document.getElementById("fullname").value;
    const rank = document.getElementById("rank").value;
    const position = document.getElementById("position").value;
    const platoon = document.getElementById("platton").value;
    const missionTime = document.getElementById("mission-time").value;
    const status = document.getElementById("select-input").value;
   
    
    const newPersonnel = {
        fullName:fullName,
        rank:rank,
        position:position,
        platoon:platoon,
        missionTime:missionTime,
        status:status,
    };
    const personnels = loadFromStorage();
    personnels.push(newPersonnel);
    saveToLocalStorage(personnels);
    render(personnels);
});

const createElement = (type) => {
    return document.createElement(type);
    
};

const saveToLocalStorage = (personnelList) => {
    localStorage.setItem('personnel', JSON.stringify(personnelList));
};

const loadFromStorage = () => {
    const personnels = JSON.parse(localStorage.getItem('personnel')) || [];
    return personnels;
};

const deletePersonnel = (personnels, index) => {
    personnels.splice(index, 1);
    saveToLocalStorage(personnels);
    render(personnels);
};

const render = (personnels) => {
    const table = document.getElementById("table-body");
    table.textContent = ""; 

    personnels.forEach((personnel, index) => {
        const newRow = createElement("tr");

        const id = index + 1;

        const nameCell = createElement("td");
        nameCell.textContent = personnel.fullName;
        newRow.appendChild(nameCell);

        const rankCell = createElement("td");
        rankCell.textContent = personnel.rank;
        newRow.appendChild(rankCell);

        const positionCell = createElement("td");
        positionCell.textContent = personnel.position;
        newRow.appendChild(positionCell);

        const platoonCell = createElement("td");
        platoonCell.textContent = personnel.platoon;
        newRow.appendChild(platoonCell);

        const statusCell = createElement("td");
        statusCell.textContent = personnel.status;
        newRow.appendChild(statusCell);

        const actionsCell = createElement("td");

        const deleteButton = createElement("button");
        deleteButton.textContent = "Remove";
        deleteButton.addEventListener("click", () => deletePersonnel(personnels, index));
        actionsCell.appendChild(deleteButton);

        newRow.appendChild(actionsCell);
        table.appendChild(newRow);
    });
};


