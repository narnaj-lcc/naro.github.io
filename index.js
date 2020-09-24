window.addEventListener('DOMContentLoaded', () =>{
    //Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.display = 'none';  
              });

              tabs.forEach( item =>{
                  item.classList.remove('tabheader__item_active');
              });
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();
    
    tabsParent.addEventListener('click', (event) =>{
        const target = event.target;

        if( target && target.classList.contains('tabheader__item')){
            tabs.forEach((item , i) =>{
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
    
    //Taimer

    const deadline = '2020-08-28';

    function getTimeRemainig(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
        days = Math.floor(t / (1000*60*60*24)),
        hours = Math.floor((t / (1000 * 60 * 60) % 24)),
        minutes = Math.floor((t / 100 / 60) % 60),
        seconds = Math.floor((t / 100 / 10 ) % 60);

        return {
            'total' : t,
            'days' : days,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds

        };

    }

    function getZero(num){
        if(num >=0 && num < 10){
            return `0${num}`;
        }else{
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector('.timer'),
        days = document.querySelector('#days'),
        hours = document.querySelector('#hours'),
        minutes = document.querySelector('#minutes'),
        seconds = document.querySelector('#seconds'),
        timeInterval = setInterval(updateClock, 1000);
        updateClock();

        function updateClock() {
            const t = getTimeRemainig(endtime);

            days.innerHTML = getZero(t.days); 
            hours.innerHTML = getZero(t.hours); 
            minutes.innerHTML = getZero(t.minutes); 
            seconds.innerHTML = getZero(t.seconds); 

            if(t.total <= 0 ) {
                clearInterval(timeInterval);
            }
        }

    }

    setClock('.timer', deadline);

    //Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modaleCloseBtn = document.querySelector('[data-close]');

        function openModal(){
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = 'hidden';
            clearInterval(ModalTimerId);
        }

        modalTrigger.forEach(btn => {
            btn.addEventListener('click', openModal ) 

        });



    modaleCloseBtn.addEventListener('click', () =>{
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    });


    // const ModalTimerId = setTimeout( openModal, 4000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight) {
                openModal();
                window.removeEventListener('scroll', showModalByScroll)
            }
    }

   // window.addEventListener('scroll', showModalByScroll);


    // Class

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt; 
            this.title = title;
            this.descr = descr;
            this.classes = classes;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;

        }
        render(){
            const element = document.createElement('div');
            this.classes.forEach(className => element.classList.add(className))
            element.innerHTML = `
                    
                  <img src=${this.src} alt=${this.alt}>
                      <h3 class="menu__item-subtitle"> ${this.title} </h3>
                      <div class="menu__item-descr"> ${this.descr} </div>
                      <div class="menu__item-divider"></div>
                      <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                     </div>
                    
            `;
            this.parent.append(element);
        }

    }


    new MenuCard(
        "img/tabs/vegy.jpg", 
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        'menu__item',
        'big'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg", 
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14,
        '.menu .container',
        'menu__item',
        'big'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg", 
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        29,
        '.menu .container',
        'menu__item',
        'big'
    ).render();


});
