var btn = document.getElementById('button');
var names = document.getElementById('name');
var mobile = document.getElementById('mobile');
var card = document.getElementById('card');

var itemcard = [];

btn.addEventListener('click', addcard);

function jsonstyle(name, mobile) {
  this.name = name;
  this.mobile = mobile;
}

function addcard(e) {
  e.preventDefault();
  var nullforms = names.value !== '' && mobile.value !== '';

  if (nullforms) {
    var newCard = new jsonstyle(names.value, mobile.value);

    var exists = false;
    for (var i = 0; i < itemcard.length; i++) {
      if ( itemcard[i].mobile === newCard.mobile) {
        exists = true;
        break;
      }
    }

    if (!exists) {
      itemcard.push(newCard);
      localStorage['cardstg'] = JSON.stringify(itemcard);
      showe();
      names.value = '';
      mobile.value = '';
    } else {
      alert('This card already exists!');
    }
  }
}

function showe() {
  card.innerHTML = '';
  itemcard = JSON.parse(localStorage['cardstg']);
  
  itemcard.sort((a, b) => a.name.localeCompare(b.name));
  
  var searchName = document.getElementById('search-name').value.toLowerCase().trim();
  var searchMobile = document.getElementById('search-mobile').value.trim();
  
  var cardmap = itemcard
    .filter((cardstg) => {

      if (searchName !== '') {
        return cardstg.name.toLowerCase().includes(searchName);
      }

      if (searchMobile !== '') {
        return cardstg.mobile.includes(searchMobile);
      }

      return true;
    })
    .map(function(cardstg, index) {
      return (
        '<div id="card-' +index +'">' +
        '<div id="cardname-' +index +'">' + cardstg.name +'</div>' +
        '<div id="cardmobile-' +index +'">' + cardstg.mobile +'</div>' +
        '<button id="dlt-' +index +'" onclick="removei(' + index +')">Delete</button>' +
        '<button id="edit-' +index +'" onclick="editcard(' +index +')">Edit</button>' +
        '</div>'
      );
    })
    
  card.innerHTML = cardmap.join('');;
}


function removei(index) {
  itemcard.splice(index, 1);
  localStorage['cardstg'] = JSON.stringify(itemcard);
  showe();
}

function editcard(index) {
  var cardname = document.getElementById('cardname-' + index);
  var cardeditname = document.getElementById('cardeditname-' + index);
  var cardnamevalue = cardname.innerText.trim();
  cardname.style.display = 'none'; 
  cardeditname.style.display = 'block';
  cardeditname.value = cardnamevalue;

  var cardmobile = document.getElementById('cardmobile-' + index);
  var cardeditmobile = document.getElementById('cardeditmobile-' + index);
  var cardmobilevalue = cardmobile.innerText.trim();
  cardmobile.style.display = 'none'; 
  cardeditmobile.style.display = 'block';
  cardeditmobile.value = cardmobilevalue;

  var editbtn = document.getElementById('edit-' + index);
  var savebtn = document.getElementById('save-' + index);
  editbtn.style.display = 'none'; 
  savebtn.style.display = 'block'; 
}

function savecard(index) {
  var cardname = document.getElementById('cardname-' + index);
  var cardeditname = document.getElementById('cardeditname-' + index);
  var cardmobile = document.getElementById('cardmobile-' + index);
  var cardeditmobile = document.getElementById('cardeditmobile-' + index);

  var newName = cardeditname.value.trim();
  var newmobile = cardeditmobile.value.trim();

  if (newName !== '' && newmobile !== '') {
    itemcard[index].name = newName;
    itemcard[index].mobile = newmobile;

    localStorage.setItem('cards', JSON.stringify(itemcard));

    cardname.innerText = newName;
    cardmobile.innerText = newmobile;

    cardname.style.display = 'block';
    cardeditname.style.display = 'none';
    cardmobile.style.display = 'block';
    cardeditmobile.style.display = 'none';

    var editbtn = document.getElementById('edit-' + index);
    var savebtn = document.getElementById('save-' + index);
    editbtn.style.display = 'block';
    savebtn.style.display = 'none';
  }
}

