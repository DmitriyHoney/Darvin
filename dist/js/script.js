

$(document).ready(function(){
    // Slider Offer
    $(".owl-one").owlCarousel({
        nav : true, // Show next and prev buttons
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem:true,
        loop: true,
        items : 1, 
        dots: false,
        onInitialized: counter,
        onChanged: counter,
    });

    // Slider Sales
    $(".owl-two").owlCarousel({
        loop:true,
        margin:10,
        dots: true,
        responsive : {
            // breakpoint from 0 up
            0 : {
                items : 1,
            },
            // breakpoint from 480 up
            480 : {
                items : 1,
            },
            // breakpoint from 768 up
            768 : {
                items : 2,
            },
            993 : {
                items : 3,
            },
            1200 : {
                items : 3,
            }
        }
    });

    //Выпадающее меню
    dropdownMenu();

    //Клик по кнопке Добавить в корзину (на карточке)
    initSalesLogic();

    initModal();

    //Динамическое отображение кол-ва слайдов
    function counter(e) {
      if (!e.namespace) return;
      let slides = e.relatedTarget;
      $('.pagination-slider')
        .text(
            slides.relative(
                slides.current()
            ) + 1 + '/' + slides.items().length
        );
    }

    let nav = document.querySelector('.navigation-bottom_sm');
    //Burger Menu
    $('.menu-btn').on('click', function(e) {
        e.preventDefault;
        $(this).toggleClass('menu-btn_active');
        if (nav.classList.contains('navigation-bottom_sm_act'))
            nav.classList.remove('navigation-bottom_sm_act')
        else
            nav.classList.add('navigation-bottom_sm_act');
    });

    


    //Functions
    function initSalesLogic() {
        let btnSale      = document.querySelectorAll('.btn-sale');
        
        btnSale.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                let icon = this.children[0];

                if (this.classList.contains('btn-sale_check')) {
                    reamoveAddClass(icon, 'fa-check', 'fa-shopping-basket');
                    reamoveAddClass(this, 'btn-sale_check', 'btn-sale_buy');
                } else {
                    reamoveAddClass(icon, 'fa-shopping-basket', 'fa-check');
                    reamoveAddClass(this, 'btn-sale_buy', 'btn-sale_check' );
                }
            })
        })
    }

    function dropdownMenu() {
        let navigationItems = document.querySelectorAll('.navigation-list__item');
        let navigationLinks = document.querySelectorAll('.base-link');
        let closeDropdownSm = document.querySelectorAll('.navigation-list__close');

        closeDropdownSm.forEach(e => {
            e.addEventListener('click', function() {
                this.parentElement.classList.remove('navigation-list__ctgry_act');
            });
        })

        document.body.addEventListener('click', function(e) {
            if (!e.target.classList.contains('base-link'))
                clearAllItems(); 
        });

        for (let elem of navigationItems) {
            elem.addEventListener('click', function(e) {
                let hasChild = this.classList.contains('navigation-list__item_children');

                if (hasChild) {
                    let isActiveMenuNow = this.children[1].classList.contains('navigation-list__ctgry_act'); 
                    clearAllItems();

                    if (hasChild && !isActiveMenuNow)
                        this.children[1].classList.add('navigation-list__ctgry_act');
                    else 
                        this.children[1].classList.remove('navigation-list__ctgry_act');
                } else 
                    clearAllItems();
            });
        }

        function clearAllItems() {
            for (let elem of navigationItems) {
                if (elem.children[1])
                    elem.children[1].classList.remove('navigation-list__ctgry_act');
            }
        }
    }

    function initModal(btnSelector, modalSelector, modalActClass, closeBtnSelector) {
        let modal = document.querySelector('.modal');
        let closeBtn = document.querySelector('.modal-close');
        let btn = document.querySelector('.btn-callback');
        console.log(modal);

        btn.addEventListener('click', () => {
            modal.classList.add('modal_act');
            console.log('click');
        });

        closeBtn.addEventListener('click', () => {
            modal.classList.remove('modal_act')
        });
    }

    //Syntax
    function reamoveAddClass(elem, removeClass, addClass) {
        elem.classList.remove(removeClass);
        elem.classList.add(addClass);
    }


});