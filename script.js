
const pages = [welcome, contract, quiz, final];
const bar = document.getElementById('bar');
function show(i) { pages.forEach(p => p.classList.remove('active')); pages[i].classList.add('active'); bar.style.width = ((i + 1) * 25) + '%'; }
start.onclick = () => show(1);

const no = document.getElementById('no');
function move() {
    no.style.position = 'fixed';
    no.style.left = Math.random() * (window.innerWidth - 120) + 'px';
    no.style.top = Math.random() * (window.innerHeight - 60) + 'px';
}
no.onmouseover = move;
no.ontouchstart = (e) => { e.preventDefault(); move(); };

yes.onclick = () => {
    msg.textContent = 'Contract Accepted ✅';
    setTimeout(() => { show(2); nextQ(); }, 1000);
};

const quizData = [
    ["Who is funnier?", ["Me 😎", "You 😏"], 0, "Correct answer: Me 😂"],
    ["Who buys next coffee?", ["Me ☕", "You ☕"], 1, "Excellent choice 😌"],
    ["Our friendship is...", ["Legendary", "Chaotic", "All of the above"], 2, "Exactly! ❤️"]
];
let qi = 0;
function nextQ() {
    if (qi >= quizData.length) { show(3); finish(); return; }
    const [q, o, c, m] = quizData[qi];
    qEl = document.getElementById('q'); opts = document.getElementById('opts'); fb = document.getElementById('fb');
    qEl.textContent = q; opts.innerHTML = ''; fb.textContent = '';
    o.forEach((t, i) => {
        let b = document.createElement('button'); b.textContent = t;
        b.onclick = () => { if (i === c) { fb.textContent = m; qi++; setTimeout(nextQ, 900); } else fb.textContent = 'Try again 😄'; };
        opts.appendChild(b);
    });
}
function finish() {
    confetti();
    const txt = "Thank you for being such an amazing friend. Life is definitely more fun with you in it! 💙";
    let i = 0; const el = document.getElementById('type');
    const t = setInterval(() => { el.textContent += txt[i++] || ''; if (i > txt.length) clearInterval(t); }, 35);
}
