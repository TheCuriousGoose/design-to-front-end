document.addEventListener('DOMContentLoaded', () => {
    checkForVisibility();

    const menuButton = document.getElementById('menu-button');
    menuButton.addEventListener('click', toggleMenu);

    document.addEventListener('click', event => {
        const { clientX, clientY } = event;

        let elements = document.elementsFromPoint(clientX, clientY);

        if (elements.includes(document.getElementById('carousel'))) {
            handleCarouselNext();
        }
    })

    window.addEventListener('scroll', checkForVisibility, false);

    handleMouseMovement();
});

let carouselIndex = 1;
let carouselData = [
    {
        img: '/imgs/AeroPulse.webp',
        name: 'AeroPulse',
        description: 'Propel Beyond the Possible'
    },
    {
        img: '/imgs/Pedaler.webp',
        name: 'Pedaler',
        description: 'Ride in Style, Glide in Color'
    },
    {
        img: '/imgs/LuminaTable.webp',
        name: 'LuminaTable',
        description: 'Dine in the Light of Innovation'
    },
]

function toggleMenu() {
    const nav = document.getElementById('mobile-nav');
    const menuButton = document.getElementById('menu-button');
    const icon = menuButton.querySelector('.fa');

    if (nav.classList.contains('hidden')) {
        nav.classList.remove('hidden')

        icon.classList.remove('fa-bars');
        icon.classList.add('fa-close')
        icon.classList.add('text-white');
    } else {
        nav.classList.add('hidden');

        icon.classList.remove('fa-close')
        icon.classList.add('fa-bars');
        icon.classList.remove('text-white');
    }
}

function handleMouseMovement() {
    const mouseDiv = document.createElement('div');
    const carousel = document.getElementById('carousel');

    let carouselImg = carousel.querySelector('img');

    mouseDiv.classList.add('mouse-circle', 'mouse');

    document.body.appendChild(mouseDiv);

    document.body.onpointermove = event => {
        const { clientX, clientY } = event;

        let elements = document.elementsFromPoint(clientX, clientY);

        if(elements.includes(carousel)){
            if(mouseDiv.style.backgroundImage != `url('${carouselData[carouselIndex - 1].img}')`){
                let index = carouselIndex === carouselData.length ? 0 : carouselIndex;

                mouseDiv.style.backgroundImage = `url('${carouselData[index].img}')`;
            }

            const mouseX = event.clientX - carouselImg.offsetLeft;
            const mouseY = event.clientY - carouselImg.offsetTop;
            const bgPosX = (mouseX / carouselImg.offsetWidth * 100) + '%';
            const bgPosY = (mouseY / carouselImg.offsetHeight * 100) + '%';
            mouseDiv.style.backgroundPosition = bgPosX + ' ' + bgPosY;
        }

        if (elements.includes(carousel) && mouseDiv.classList.contains('mouse-circle')) {
            let index = carouselIndex === carouselData.length ? 0 : carouselIndex;

            mouseDiv.style.backgroundImage = `url('${carouselData[index].img}')`;

            mouseDiv.classList.add('carousel-over')
            mouseDiv.classList.remove('mouse-circle');
        }

        if (!elements.includes(carousel) && mouseDiv.classList.contains('carousel-over')) {
            mouseDiv.style.backgroundImage = '';

            mouseDiv.classList.add('mouse-circle');
            mouseDiv.classList.remove('carousel-over')
        }

        mouseDiv.animate({
            left: `${clientX}px`,
            top: `${clientY}px`
        }, { duration: 1, fill: "forwards" })
    }
}

function handleCarouselNext() {
    const carousel = document.getElementById('carousel');
    const carouselImg = carousel.querySelector('img');
    const carouselName = carousel.querySelector('.name');
    const carouselDescription = carousel.querySelector('.description');

    if (carouselIndex === carouselData.length) {
        carouselIndex = 1;
    } else {
        carouselIndex++;
    }

    let newCarouselData = carouselData[carouselIndex - 1];

    carouselImg.src = newCarouselData.img;
    carouselName.innerHTML = newCarouselData.name;
    carouselDescription.innerHTML = newCarouselData.description;
}


function checkForVisibility() {
    let headers = document.querySelectorAll(".scrollable-text");
    headers.forEach(function (header) {
        if (isElementInViewport(header)) {
            header.classList.add("text-visible");
        } else {
            header.classList.remove("text-visible");
        }
    });
}

function isElementInViewport(element) {
    let rect = element.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}