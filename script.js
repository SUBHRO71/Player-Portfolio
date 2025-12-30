document.addEventListener("DOMContentLoaded", () => {

const toggle = document.querySelector(".toggle");

toggle.addEventListener("click",()=>{
  toggle.classList.toggle("active");
  document.body.classList.toggle("light-mode");
});


const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
if(menuToggle && navLinks){
  menuToggle.addEventListener("click", ()=>{
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });
}

const sections = document.querySelectorAll("section, .bio-section");
const navItems = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver((entries)=>{
 entries.forEach(entry=>{
  if(entry.isIntersecting){
    navItems.forEach(l=>l.classList.remove("active"));
    const active = document.querySelector(`.nav-links a[href='#${entry.target.id}']`);
    if(active) active.classList.add("active");
  }
 });
},{threshold:0.5});

sections.forEach(s=>observer.observe(s));

let started=false;
const heroObs=new IntersectionObserver(e=>{
 if(e[0].isIntersecting && !started){
  started=true;
  document.querySelectorAll(".count").forEach(counter=>{
    const target=+counter.dataset.target;
    let value=0;
    function update(){
      if(value<target){
        value+=target/100;
        counter.textContent=Math.ceil(value);
        requestAnimationFrame(update);
      } else counter.textContent=target;
    }
    update();
  });
 }
},{threshold:0.5});
const hero = document.querySelector(".hero");
if(hero) heroObs.observe(hero);

if(hero){
  function animateHero(){
    const y = window.scrollY;
    const vh = window.innerHeight;

    if(y <= vh){
      hero.style.transform = `translate3d(0, ${y * 0.65}px, 0)`;
    }

    let fade = 1 - 1.2*(y / vh);
    hero.style.opacity = fade >= 0 ? fade : 0;

    requestAnimationFrame(animateHero);
  }
  requestAnimationFrame(animateHero);
}

window.addEventListener("scroll",()=>{
 const h=document.documentElement.scrollHeight-document.documentElement.clientHeight;
 document.getElementById("scroll-progress").style.width=(scrollY/h)*100+"%";
});

const timelineData = [
  {
    year: 2007,
    title: "F1 Debut",
    desc: "Almost won rookie season",
    more: "Lewis made one of the most impressive rookie debuts in Formula 1 history, fighting for the championship till the final race."
  },
  {
    year: 2008,
    title: "World Champion",
    desc: "Youngest champ at the time",
    more: "He became the youngest World Champion then, delivering one of the most dramatic last-lap title victories ever in Brazil."
  },
  {
    year: 2013,
    title: "Mercedes Move",
    desc: "Best decision ever",
    more: "Criticised by many for leaving McLaren, this became the greatest team switch in F1 history and changed the sport forever."
  },
  {
    year: 2020,
    title: "7th Title",
    desc: "Legend cemented",
    more: "Lewis matched Michael Schumacher with 7 World Championships, dominating the hybrid era and breaking countless records."
  }
];


const timelineContainer = document.getElementById("timeline-container");

timelineData.forEach(item => {
  const div = document.createElement("div");
  div.className = "timeline-item";

  div.innerHTML = `
    <div class="timeline-content">
      <div class="timeline-year">${item.year}</div>
      <div class="timeline-title">${item.title}</div>
      <p class="timeline-desc">${item.desc}</p>

      <div class="timeline-more">
        ${item.more}
      </div>

      <span class="timeline-toggle">Show More ▾</span>
    </div>
  `;

  timelineContainer.appendChild(div);
});

document.addEventListener("click",(e)=>{
  if(e.target.classList.contains("timeline-toggle")){
    
    const card = e.target.closest(".timeline-content");
    card.classList.toggle("open");

    e.target.textContent =
      card.classList.contains("open")
      ? "Show Less ▴"
      : "Show More ▾";
  }
});


const gallery=[
 {category:"ferrari",img:"https://cdn.ferrari.com/cms/network/media/img/resize/67c834dfd12cab001f5ef82c-ferrari-sf-25-espacio-media-reveal-1-desk?width=1920&height=1920"},
 {category:"mercedes",img:"https://images.ctfassets.net/1fvlg6xqnm65/6IEPnRkna1cUeGLNo4aMAt/74b1c16aea41a3fc303b7bd5f6e9c2fc/M484333.jpg"},
 {category:"ferrari",img:"https://cdn.ferrari.com/cms/network/media/img/resize/68663b388b64380021dca178-ferrari-499p-hypercar-at-t-2025-june-udt-cover-desk?width=1920&height=1080"}
];

const grid=document.getElementById("gallery-grid");
if(grid){
  gallery.forEach(i=>{
    const div=document.createElement("div");
    div.className="gallery-item";
    div.dataset.category=i.category;
    div.innerHTML=`<img src='${i.img}' onclick="openModal('${i.img}')">`;
    grid.appendChild(div);
  });

  document.querySelectorAll(".filter-btn").forEach(btn=>{
    btn.onclick=()=>{
      document.querySelectorAll(".filter-btn").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      const f=btn.dataset.filter;
      document.querySelectorAll(".gallery-item").forEach(item=>{
        item.style.display=(f==="all"||item.dataset.category===f)?"block":"none";
      });
    };
  });
}

window.openModal=(src)=>{
 document.getElementById("modal").classList.add("active");
 document.getElementById("modal-img").src=src;
};
window.closeModal=()=>{
 document.getElementById("modal").classList.remove("active");
};

window.handleSubmit=(e)=>{
 e.preventDefault();
 alert("🏆 Thank you! Lewis appreciates your support!\n#TeamLH #StillIRise");
 e.target.reset();
};

});

const ctx = document.getElementById("statsChart");

if(ctx){
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["Wins", "Podiums", "Poles", "Titles"],
      datasets: [{
        label: "Career Stats",
        data: [105, 202, 104, 7],
        backgroundColor: ["#DC0000", "#990000", "#ff3333", "#e60000"],
        borderRadius: 10
      }]
    },
    options: {
      responsive: true,
      plugins:{
        legend:{display:false}
      },
      scales:{
        x:{ticks:{color:"#fff"}},
        y:{ticks:{color:"#fff"}}
      }
    }
  });
}
