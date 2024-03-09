const el = (el) => {
    if(typeof el === 'string') {
        if(el[0] === '#') {
            return document.getElementById(el.slice(1));
        } else {
            return document.querySelectorAll(el);
        }
    } else {
        return el;
    }
}
if (localStorage.getItem('track') === null) {
    localStorage.setItem('track', 0);
}

const questions = [
    [
      "Given the choice of anyone in the world, whom would you want as a dinner guest?",
      "Would you like to be famous? In what way?",
      "Before making a telephone call, do you ever rehearse what you are going to say? Why?",
      "What would constitute a \"perfect\" day for you?",
      "When did you last sing to yourself? To someone else?",
      "If you were able to live to the age of 90 and retain either the mind or body of a 30-year-old for the last 60 years of your life, which would you want?",
      "Do you have a secret hunch about how you will die?",
      "Name three things you and your partner appear to have in common.",
      "For what in your life do you feel most grateful?",
      "If you could change anything about the way you were raised, what would it be?",
      "Take four minutes and tell your partner your life story in as much detail as possible.",
      "If you could wake up tomorrow having gained any one quality or ability, what would it be?"
    ],
    [
      "If a crystal ball could tell you the truth about yourself, your life, the future, or anything else, what would you want to know?",
      "Is there something that you've dreamed of doing for a long time? Why haven't you done it?",
      "What is the greatest accomplishment of your life?",
      "What do you value most in a friendship?",
      "What is your most treasured memory?",
      "What is your most terrible memory?",
      "If you knew that in one year you would die suddenly, would you change anything about the way you are now living? Why?",
      "What does friendship mean to you?",
      "What roles do love and affection play in your life?",
      "Alternate sharing something you consider a positive characteristic of your partner. Share a total of five items.",
      "How close and warm is your family? Do you feel your childhood was happier than most other people's?",
      "How do you feel about your relationship with your mother?"
    ],
    [
      "Make three true \"we\" statements each. For instance, \"We are both in this room feeling...\".",
      "Complete this sentence: \"I wish I had someone with whom I could share...\".",
      "If you were going to become a close friend with your partner, please share what would be important for him or her to know.",
      "Tell your partner what you like about them; be very honest this time, saying things that you might not say to someone you've just met.",
      "Share with your partner an embarrassing moment in your life.",
      "When did you last cry in front of another person? By yourself?",
      "Tell your partner something that you like about them already.",
      "What, if anything, is too serious to be joked about?",
      "If you were to die this evening with no opportunity to communicate with anyone, what would you most regret not having told someone? Why haven't you told them yet?",
      "Your house, containing everything you own, catches fire. After saving your loved ones and pets, you have time to safely make a final dash to save any one item. What would it be? Why?",
      "Of all the people in your family, whose death would you find most disturbing? Why?",
      "Share a personal problem and ask your partner's advice on how he or she might handle it. Also, ask your partner to reflect to you how you seem to be feeling about the problem you have chosen."
    ]
  ]
const card = {
    add: (parent, id, content) => {
        const card = document.createElement('card-o');
        card.setAttribute('id', id);
        card.innerHTML = content;
        parent.insertBefore(card, parent.firstChild);
    },
    remove: (id) => {
        el(`#${id}`).remove();
    },
    show: (id) => {
        el(`#${id}`).style.display = 'block';
    },
    hide: (id) => {
        el(`#${id}`).style.display = 'none';
    },
    change : (id, content) => {
        el(`#${id}`).innerHTML = content;
    }
}
const shuffle = (array) => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  };
let sort;'sort', JSON.stringify(sort)
if (localStorage.getItem('sort') !== null) {
    sort = JSON.parse(localStorage.getItem('sort'));
} else{
    let tempSort = []
    for (let i = 0; i < 3; i++) {
        const id = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const id2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        if (i < 1.5){
            let ha = shuffle(id); 
            tempSort.push(ha);
        } else {
            let ma = shuffle(id2);
            tempSort.push([...ma, 12]);
        }
    }
    localStorage.setItem('sort', JSON.stringify(tempSort));
    sort = tempSort;
}
const slide = (id1, id2) => {
    if(el(`#${id1}`) && el(`#${id2}`)){
        el(`#${id1}`).style.transform = 'translate(calc(-50% + 100vw), -50%) scale(1)';
        el(`#${id2}`).style.transform = 'translate(-50%, -50%) scale(1)';
        localStorage.setItem('track', Number(localStorage.getItem('track')) + 1);
    }
}
const unslide = (id1, id2) => {
    if (el(`#${id1}`) && el(`#${id2}`)) {
        el(`#${id1}`).style.transform = 'translate(-50%, -50%) scale(1)';
        el(`#${id2}`).style.transform = 'translate(-50%, -50%) scale(0.99)';
        localStorage.setItem('track', Number(localStorage.getItem('track')) - 1);
    }
}
const usedQset = [];
sort.forEach((a, i) => {
    let qset = [];
    a.forEach((b, j) => {
        qset.push(questions[i][b-1]);
    });
    usedQset.push(qset);
})
usedQset.forEach((q, a) => {
    q.forEach((c, i) => {
      // Calculate font size based on text length, domain, and range
      const minFontSize = 1.5;
      const maxFontSize = 2;
      const textLength = c.length; // Assuming 'c' is the text content
      const domainLength = Math.max(...usedQset.flatMap(q => q).map(text => text.length)) - Math.min(...usedQset.flatMap(q => q).map(text => text.length)); // Find max length across all elements
      const fontSize = maxFontSize + ((minFontSize - maxFontSize) * (textLength - Math.min(...usedQset.flatMap(q => q).map(text => text.length))) / domainLength);
      // Construct the content with adjusted font size
      const ff = `
        <p style="font-size: ${fontSize}rem;">${c}</p>
        <div>
            <button onclick="unslide('q-36-${(12*a + i)}', 'q-36-${(12*a + i + 1)}')"><i class="fa-solid fa-arrow-left"></i></button><p>${(12*a + i+1)}</p>
            <button onclick="slide('q-36-${(12*a + i+1)}', 'q-36-${(12*a + i+2)}')"><i class="fa-solid fa-arrow-right"></i></button>
        </div>
      `;
      // Add the content to the card with appropriate class
      card.add(el('#q-36'), `q-36-${(12*a + i+1)}`, ff);
      el(`#q-36-${(12*a + i+1)}`).classList.add('q-36-card');
      if ((12*a + i) < localStorage.getItem('track')){
        el(`#q-36-${(12*a + i+1)}`).style.transform = 'translate(calc(-50% + 100vw), -50%) scale(1)';
      } else 
      if ((12*a + i + 1) < localStorage.getItem('track')){
        el(`#q-36-${(12*a + i+1)}`).style.transform = 'translate(-50%, -50%) scale(1)';
      } else {
        el(`#q-36-${(12*a + i+1)}`).style.transform = 'translate(-50%, -50%) scale(0.99)';
      }
    });
  });
const startOver = () => {
    let track = localStorage.getItem('track');
    if(track > 0){
        const time = 50*track;
        for (let i = track + 1; i > -1; i--) {
            setTimeout(() => {
                unslide(`q-36-${(i)}`, `q-36-${(i + 1)}`);
            }, time - (i*50));
        }
    }
}

  