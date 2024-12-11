// 첫번째 셀 부분 script

const mushElements = document.querySelectorAll('.mush1, .mush2, .mush3');

// 각 요소에 클릭 이벤트 추가
mushElements.forEach((mush) => {
    mush.addEventListener('click', () => {
        mush.classList.add('wobble');

        // 애니메이션이 끝나면 wobble 클래스 제거
        mush.addEventListener('animationend', () => {
            mush.classList.remove('wobble');
        }, { once: true }); // 이벤트를 한 번만 실행
    });
});



// 두번째 셀 부분 script

document.querySelectorAll('.flower').forEach((path) => {
    const box = path.getBBox(); // 각 svg 페스마다 중심을 설정해서 애니메이션이 정상작동할 수 있게...
    const centerX = box.x + box.width / 2;
    const centerY = box.y + box.height / 2;

    path.style.transformOrigin = `${centerX}px ${centerY}px`;
});



// 세번째 셀 부분 script

const svgElements = document.querySelectorAll('.cat_body');
const groupMovementRadius = 10;

document.addEventListener('mousemove', (event) => {
    svgElements.forEach((svg) => {
        const eyesGroup = svg.querySelector('.cat_eyes');
        const svgRect = svg.getBoundingClientRect();
        const eyeGroupCenter = { x: svgRect.width / 2, y: 75.6122 }; // 중심 지정

        // 마우스 x, y 좌표 변환
        const mouseX = event.clientX - svgRect.left;
        const mouseY = event.clientY - svgRect.top;

        // .eyes 에서 지정해 준 중심이랑 마우스의 x, y 축을 계산
        const deltaX = mouseX - eyeGroupCenter.x;
        const deltaY = mouseY - eyeGroupCenter.y;
        const angle = Math.atan2(deltaY, deltaX); // + 각도 계산


        const distance = Math.min(groupMovementRadius, Math.sqrt(deltaX * deltaX + deltaY * deltaY)); // 최대 거리 제한

        // 새로운 x, y 축 좌표를 계산해서 >
        const newX = Math.cos(angle) * distance;
        const newY = Math.sin(angle) * distance;

        // 그 계산된 좌표를 사용해 유령의 눈이 마우스를 바라보는것처럼 하게 함
        eyesGroup.setAttribute('transform', `translate(${newX}, ${newY})`);
    });
});

document.addEventListener('DOMContentLoaded', () => { // 클릭 이벤트 토글
    const cat1 = document.querySelector('.CAT1_eye1');
    const cat2 = document.querySelector('.CAT2');
    const cat3 = document.querySelector('.CAT3');

    if (cat1) {
        cat1.addEventListener('click', () => {
            const catClosed = cat1.querySelector('.cat_closed');
            toggleClass(catClosed, 'found2');
        });
    }

    if (cat2) {
        cat2.addEventListener('click', () => {
            const catEar = cat2.querySelector('.cat_ear');
            toggleClass(catEar, 'found1');
        });
    }

    if (cat3) {
        cat3.addEventListener('click', () => {
            const catThug = cat3.querySelector('.cat_thug');
            toggleClass(catThug, 'found3');
        });
    }

    function toggleClass(catDiv, className) {
        if (!catDiv) return; // 방어 코드 추가
        catDiv.classList.add(className);
        setTimeout(() => {
            catDiv.classList.remove(className);
        }, 2000);
    }
});



// 네번째 셀 부분 script

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".weather_animation");
    let currentIndex = 0;

    sections.forEach((section, index) => {
        section.addEventListener("click", () => {
            sections[currentIndex].classList.remove("active2");
            currentIndex = (index + 1) % sections.length; // 다음 섹션으로 순환
            sections[currentIndex].classList.add("active2");
        });
    });
});



// 다섯번째 셀 부분 script

//XXX


// 여섯번째 셀 부분 script

// 플립 애니메이션 작동 부분..
const cardFlips = document.querySelectorAll('.card_flip');
// const start = document.querySelectorAll('.card_layout');
let lastFlippedCard = null; // 마지막으로 플립된 카드
let isFlipping = false; // 현재 플립 중인지 여부
let matchedCards = 0; // 맞춘 카드 수

// 게임이 시작되면, 셀 페이지 안에 들어오면..
window.onload = function() { // 처음 들어오면 (처음 로드되면)
    cardFlips.forEach(card => {
        card.classList.add('flipped'); // 모든 카드 플립
    });

    // 2초 후에 모든 카드를
    setTimeout(() => {
        cardFlips.forEach(card => {
            card.classList.remove('flipped'); // 다시 뒤집기
        });
    }, 2000);
};

// 카드 맞추기 게임을 하는 도중, 같은 모양의 카드를 맞추면- 맞추지 못하면..
cardFlips.forEach(card => {
    card.addEventListener('click', () => { // 카드에 클릭 이벤틀 추가
        if (isFlipping || card.classList.contains('flipped')) return; // 현재 플립 중이거나 이미 플립된 카드라면 플립하지 못함

        card.classList.add('flipped');

        if (lastFlippedCard) {
            // 이전 카드와 현재 카드가 같은 카드일 경우
            if (lastFlippedCard.dataset.card === card.dataset.card) {

                lastFlippedCard = null; // 마지막 카드 초기화로 맞춘 뒤 다른 카드와의 오류가 생기지 않도록...
                matchedCards += 2; // 맞춘 카드 수 증가
                if (matchedCards === cardFlips.length) {
                    // 모든 카드를 맞추면 게임을 리셋해서 처음부터 시작할 수 있도록
                    setTimeout(() => {
                        resetGame();
                    }, 1500);
                }
            } else {
                // 다른 카드일 경우
                isFlipping = true; // 플립 중 상태로 변경
                setTimeout(() => {
                    card.classList.remove('flipped'); // 현재 카드 뒤집기
                    lastFlippedCard.classList.remove('flipped'); // 이전 카드 뒤집기
                    lastFlippedCard = null;
                    isFlipping = false; // 플립 중 상태 해제
                }, 700);
            }
        } else {
            // 첫 번째 카드 클릭 시
            lastFlippedCard = card; // 마지막 카드 업데이트
        }
    });
});

function resetGame() { // 모든 카드를 맞추면..
    cardFlips.forEach(card => {
        card.classList.remove('flipped'); // 모든 카드 초기화
    });
    matchedCards = 0; // 맞춘 카드 수 초기화로 다시 시작했을 때(다 맞춰서 게임이 다시 시작되었을 때)플립을 할 수 있도록..
    lastFlippedCard = null;
}


// 일곱번째 셀 부분 script

const animeSections = document.querySelectorAll('.cat_anime-1, .cat_anime-2, .cat_anime-3');

animeSections.forEach((section) => {
    const anime1 = section.querySelector('.cat_anime1');
    const anime2 = section.querySelector('.cat_anime2');
    let isAnimating = false; // 애니메이션 중인지 확인하는 플래그

    section.addEventListener('click', () => {
        if (isAnimating) return; // 애니메이션 중이면 클릭 무시
        isAnimating = true; // 애니메이션 시작

        // 애니메이션 추가
        anime1.style.animation = 'CAT_down 3s ease-in forwards';
        anime2.style.animation = 'CAT_up 2.5s ease-in forwards';

        // 각각의 애니메이션이 끝날 때 초기화
        anime1.addEventListener(
            'animationend',
            () => {
                anime1.style.animation = ''; // 애니메이션 초기화
                isAnimating = false; // 애니메이션 종료
            },
            { once: true } // 이벤트가 한 번만 실행되도록 설정
        );

        anime2.addEventListener(
            'animationend',
            () => {
                anime2.style.animation = ''; // 애니메이션 초기화
                isAnimating = false; // 애니메이션 종료
            },
            { once: true } // 이벤트가 한 번만 실행되도록 설정
        );
    });
});


// 여덟번째 셀 부분 script

const animations = document.querySelectorAll('.step_animation');
let currentIndex = 4; // 초기 애니메이션 인덱스

function showNextAnimation() {
    // 현재 활성화된 애니메이션에서 active 제거
    animations[currentIndex].classList.remove('active1');

    // 다음 애니메이션 인덱스 계산 (루프 처리)
    currentIndex = (currentIndex + 1) % animations.length;

    // 다음 애니메이션에 active 추가
    animations[currentIndex].classList.add('active1');
}

// 이벤트 리스너 등록
animations.forEach(animation => {
    animation.addEventListener('click', showNextAnimation);
});


// 아홉번째 셀 부분 script

// 필요한 요소들을 선택
const cloverEElements = document.querySelectorAll(".clover_E");
const cloverSElements = document.querySelectorAll(".clover_S");
const clover = document.querySelector(".clover");

// 클릭된 요소의 상태를 추적
let clickedCount = 0;

// 각 clover_E 요소에 클릭 이벤트 추가
cloverEElements.forEach((el, index) => {
    el.addEventListener("click", () => {
        // 관련된 clover_S 요소에 fine1 클래스 추가
        const targetCloverS = cloverSElements[index];
        if (!targetCloverS.classList.contains("fine1")) {
            targetCloverS.classList.add("fine1");
            clickedCount++;
        }

        // 모든 clover_S 요소에 fine1이 추가되었는지 확인
        if (clickedCount === cloverSElements.length) {
            clover.classList.add("fine2"); // clover 요소 보이기

            // 2초 후 초기화
            setTimeout(() => {
                // 모든 fine1 클래스 제거
                cloverSElements.forEach((el) => el.classList.remove("fine1"));

                // clover 의 fine2 클래스 제거
                clover.classList.remove("fine2");

                // 클릭 카운트 초기화
                clickedCount = 0;
            }, 5000);
        }
    });
});
