describe("createNewMarker", () => {
  it("should return a div element with class 'map-marker-container'", () => {
    const marker = createNewMarker();
    expect(marker).toBeInstanceOf(HTMLDivElement);
    expect(marker.classList).toContain("map-marker-container");
  });

  it("should contain a div element with class 'marker-container'", () => {
    const marker = createNewMarker();
    const markerContainer = marker.querySelector(".marker-container");
    expect(markerContainer).toBeTruthy();
    expect(markerContainer).toBeInstanceOf(HTMLDivElement);
  });

  it("should contain a div element with class 'marker-card'", () => {
    const marker = createNewMarker();
    const markerCard = marker.querySelector(".marker-card");
    expect(markerCard).toBeTruthy();
    expect(markerCard).toBeInstanceOf(HTMLDivElement);
  });

  it("should contain a div element with class 'front face'", () => {
    const marker = createNewMarker();
    const frontFace = marker.querySelector(".front.face");
    expect(frontFace).toBeTruthy();
    expect(frontFace).toBeInstanceOf(HTMLDivElement);
  });

  it("should contain a div element with class 'back face'", () => {
    const marker = createNewMarker();
    const backFace = marker.querySelector(".back.face");
    expect(backFace).toBeTruthy();
    expect(backFace).toBeInstanceOf(HTMLDivElement);
  });

  it("should contain an element with class 'marker-arrow'", () => {
    const marker = createNewMarker();
    const markerArrow = marker.querySelector(".marker-arrow");
    expect(markerArrow).toBeTruthy();
  });
});
