// 첫번째 셀 부분 script

// 두번째 셀 부분 script

document.querySelectorAll('.flower').forEach((path) => {
    const bbox = path.getBBox(); // 각 svg 페스마다 중심을 설정해서 애니메이션이 정상작동할 수 있게...
    const centerX = bbox.x + bbox.width / 2;
    const centerY = bbox.y + bbox.height / 2;

    path.style.transformOrigin = `${centerX}px ${centerY}px`;
});
// 세번째 셀 부분 script

// 네번째 셀 부분 script

// 다섯번째 셀 부분 script

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

// 여덟번째 셀 부분 script

// 아홉번째 셀 부분 script

