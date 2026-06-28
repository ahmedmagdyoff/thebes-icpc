// Topics
async function topics(level) {
    const data = await (await fetch(`data/topics/${level}.csv`)).text();
    const content = document.querySelector(`#level${level}-content`);
    const grid = content.querySelector(`.weeks-grid`);
    data.trim().split("\n").slice(1).forEach((line) => {
        const [title, tag, explanation, upsolve, practice] = line.split(",");
        grid.innerHTML += `
            <div class="week-card level${level}-card">
                <div class="week-header">
                    <h3 class="week-title">${title}</h3>
                    <span class="week-tag level${level}-tag">${tag}</span>
                </div>
                <div class="week-materials">
                    <a ${explanation && `href="${explanation}"`} target="_blank" class="material-link">
                        <i class="fab fa-youtube"></i>
                        <span>Explanation Sessions</span>
                    </a>
                    <a ${upsolve && `href="${upsolve}"`} target="_blank" class="material-link">
                        <i class="fab fa-youtube"></i>
                        <span>Upsolve Sessions</span>
                    </a>
                    <a ${practice && `href="${practice}"`} target="_blank" class="material-link">
                        <i class="fas fa-link"></i>
                        <span>Practice Sheet</span>
                    </a>
                </div>
            </div>
        `;
    });
    if (content && !content.previousElementSibling.classList.contains("collapsed")) content.style.maxHeight = content.scrollHeight + "px";
}

// Performers
function performers(level) {
    const list = document.querySelector(`.level${level}-slide .performer-list`);
    fetch(`data/performers/${level}.csv`).then(res => res.text()).then(text => {
        text.trim().split("\n").slice(1).forEach((line, i) => {
            const [handle, all, , , percentage] = line.split(",");
            list.innerHTML += `
                <!-- Rank ${i + 1} -->
                <div class="performer">
                    <div class="rank rank-${i + 1}">${i + 1}</div>
                    <div class="performer-info">
                        <h4>${handle}</h4>
                        <p>Solved: ${all} Problems</p>
                    </div>
                    <div class="score">${percentage}</div>
                </div>
            `;
        });
    });
}