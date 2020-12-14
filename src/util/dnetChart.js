
export function getDividedOptions(props) {
  const firstOption = {
    ...props,
    ...props.comparisonOptions[props.status[0]],
    comparisonOptions: ''
  }
  const secondOption = {
    ...props,
    ...props.comparisonOptions[props.status[1]],
    comparisonOptions: ''
  }
  const middleX = (props.source.x + props.target.x) / 2
  const middleY = (props.source.y + props.target.y) / 2
  firstOption.target = {
    ...firstOption.target,
    x: middleX,
    y: middleY
  }
  secondOption.source = {
    ...secondOption.source,
    x: middleX,
    y: middleY,
  }
  return { firstOption, secondOption }
}