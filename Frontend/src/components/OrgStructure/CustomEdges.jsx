import { BaseEdge, getStraightPath } from 'reactflow';

export function RoleEdge({ id, sourceX, sourceY, targetX, targetY }) {
  const [edgePath] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <BaseEdge
      id={id}
      path={edgePath}
      style={{ stroke: '#81a73d', strokeWidth: 3 }}
    />
  );
}
