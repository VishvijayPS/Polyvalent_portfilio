const robo = document.getElementById("eye-model3000");
const sections = Array.from(document.querySelectorAll("section"));

const shiftPositions = [100, -10, -10, -180, -180, 5, -180];
const cameraOrbits = [
  [30, 100],
  [60, 100],
  [50, 80],
  [-30, 95],
  [-30, 85],
  [20, 100],
  [-40, 110],
];

const sectionOffsets = sections.map((section) => section.offsetTop);
const lastSectionIndex = sections.length - 1;

// console.log(sectionOffsets);

const interpolate = (start, end, progress) => start + (end - start) * progress;

const getScrollProgress = (scrollY) => {
  for (let i = 0; i < lastSectionIndex; i++) {
    if (scrollY >= sectionOffsets[i] && scrollY < sectionOffsets[i + 1]) {
      return (
        i +
        (scrollY - sectionOffsets[i]) /
          (sectionOffsets[i + 1] - sectionOffsets[i])
      );
    }
  }
  return lastSectionIndex;
};

window.addEventListener("scroll", () => {
  const scrollProgress = getScrollProgress(window.scrollY);

  // console.log(scrollProgress);

  const sectionIndex = Math.floor(scrollProgress);
  const sectionProgress = scrollProgress - sectionIndex;

  const currentShift = interpolate(
    shiftPositions[sectionIndex],
    shiftPositions[sectionIndex + 1] ?? shiftPositions[sectionIndex],
    sectionProgress
  );


  const currentOrbit = cameraOrbits[sectionIndex].map((val, i) =>
    interpolate(
      val,
      cameraOrbits[sectionIndex + 1]?.[i] ?? val,
      sectionProgress
    )
  );

  robo.style.transform = `translateX(${currentShift}%)`;
  robo.setAttribute(
    "camera-orbit",
    `${currentOrbit[0]}deg ${currentOrbit[1]}deg`
  );

});

// [292, 0, 973, 1946, 2918, 3891, 4864]
