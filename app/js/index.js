Array.prototype.last = function(){
    return this[this.length - 1];
};

let projects = [
    '1 мая',
    'Green Park',
    'Vander Park',
    'Академика Павлова',
    'Аннино Парк',
    'Борисоглебский',
    'Вавилова 4',
    'Варшавское шоссе 141',
    'Влюблино',
    'Восточное Бутово',
    'Грибоедовский',
    'Дмитровский парк',
    'Ельнинская 14А',
    'Жемчужина Зеленограда'
]

function createProjectDiv(projectName) {
    let div = document.createElement('div');
    div.classList.add('profile-card__project', 'project');
    let p = document.createElement('p');
    p.classList.add('project__name');
    p.innerHTML = projectName;
    div.appendChild(p);
    return div;
}

function addProjectDivs(projectNames, parentDiv) {
    let row = 1,
        width = 0,
        firstChild = parentDiv.firstElementChild;

    let projects = projectNames.map((p) => {
        let div = createProjectDiv(p);
        parentDiv.insertBefore(div, firstChild)
        width += div.offsetWidth + 10;       
        if (width >= parentDiv.offsetWidth) {
            ++row;
            width = div.offsetWidth + 10;
        }
        return { element: div, row: row }
    });

    if (row >= 3) {
        projects.filter(prj => prj.row == 2).last().hiden = true;
        projects.filter(prj => prj.row >= 3).forEach(prj => prj.hiden = true);
        firstChild.classList.remove('project_display-none');
    } 

    return projects;
}

function hideElements(projectDivs, button) {
    let projectsToHide = projectDivs.filter(prj => prj.hasOwnProperty('hiden'));

    button.addEventListener('click', () => projectsToHide.forEach(prj => {
        prj.hiden ?
            prj.element.classList.add('project_display-none') :
            prj.element.classList.remove('project_display-none');          
        prj.hiden = !prj.hiden;
    }));
}

let hideButton = document.getElementById('hide-projects'),
    projectDivs = addProjectDivs(projects, document.getElementById('user-projects'));

hideElements(projectDivs, hideButton);