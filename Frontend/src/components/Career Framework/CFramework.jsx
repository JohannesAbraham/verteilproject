import React from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';
import './CFramework.css';
import { TransformWrapper, TransformComponent, useControls, } from "react-zoom-pan-pinch";


const Controls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="tools">
      <button onClick={() => zoomIn()}>+</button>
      <button onClick={() => zoomOut()}>-</button>
      <button onClick={() => resetTransform()}>x</button>
    </div>
  );
};


const CareerFramework = () => {
  return (
    <div className="org-chart-container">
      <h1 className="org-chart-title">Career Framework</h1>
      <div className="org-chart-wrapper">
        <div className="org-chart-inner">
          <TransformWrapper
            initialScale={1}
            initialPositionX={200}
            initialPositionY={100}
          >

            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
              <>
          <Controls />
            <TransformComponent>
                <img className='image' src="Career-Framework-Sample.jpg" alt="" />
          </TransformComponent>
          </>
      )}
          </TransformWrapper>
        </div>
      </div>
    </div>
  );
};

export default CareerFramework;

