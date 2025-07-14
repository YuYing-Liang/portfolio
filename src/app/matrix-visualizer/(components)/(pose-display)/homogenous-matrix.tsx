import { type FC } from "react"
import type { EulerAngleOrders, TriadPoseDisplayProps } from "../../types"
import { Badge, NumberInput } from "@mantine/core"

interface MatrixDisplayProps extends TriadPoseDisplayProps {
  angleOrder: EulerAngleOrders
}

export const MatrixDisplay: FC<MatrixDisplayProps> = (props) => {
  const matrix = [1, 2.96, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]

  return (
    <div className="grid grid-flow-row grid-cols-4 gap-1">
      {props.editable ? 
      matrix.map((elem, i) => (
        <NumberInput
          key={i}
          radius="sm"
          size="xs"
          variant="default"
          value={elem}
          hideControls 
          w={75}
        />
      )) :
      matrix.map((elem, i) => (
        <Badge
          key={i}
          radius="sm"
          size="md"
          variant="default"
          w={50}
        >
          {elem}
        </Badge>
      ))}
    </div>
  )
}