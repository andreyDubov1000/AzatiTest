class Anime {
  getCardsInfo(container) {
    const cards = container.querySelectorAll('.card')

    return Array.from(cards).map((item) => {
      const rect = item.getBoundingClientRect()

      return {
        element: item,
        x: rect.left,
        y: rect.top,
      }
    })
  }

  aminateCards(oldInfo, newInfo, dataset) {
    newInfo.forEach((newCard) => {
      const elementNew = newCard.element

      let translateX = -newCard.x
      let translateY = 0

      const oldCard = oldInfo.find((itemOld) => {
        const elementOld = itemOld.element

        return elementOld.dataset[dataset] === elementNew.dataset[dataset]
      })

      if (oldCard) {
        translateX = oldCard.x - newCard.x
        translateY = oldCard.y - newCard.y
      }
      elementNew.animate(
        [
          {
            transform: `translate(${translateX}px, ${translateY}px)`,
          },
          { transform: 'none' },
        ],
        {
          duration: 400,
          easing: 'ease-out',
        }
      )
    })
  }
}
export default Anime
