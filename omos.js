  // Count til om os side ------------------------------------------------ 

  function countUp(element) {
    let currentNumber = 0;
    const finalNumber = Number(element.innerText);
    const totalTime = 4000;
    const increment = Math.round(finalNumber / (totalTime / 60));
    function updateNumber() {
      currentNumber += increment;
      element.innerText = currentNumber;
      if (currentNumber < finalNumber - increment) {
        requestAnimationFrame(updateNumber);
      } else {
        element.innerText = finalNumber;
      }
    }
    requestAnimationFrame(updateNumber);
  }

  function countHandler(entries) {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        countUp(entry.target);
      }
    }
  }

  const countObserver = new IntersectionObserver
  (countHandler, {
      threshold: 0.9
  });


  const countElements = document.querySelectorAll(".count");

  for (const countElement of countElements) {
    countObserver.observe(countElement)
  }