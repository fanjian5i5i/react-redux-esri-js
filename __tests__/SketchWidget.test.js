import React from 'react';
import {render, fireEvent} from "@testing-library/react";
import SketchWidget from '../../src/app/components/SketchWidgetPaperPie';
import { ExpansionPanelActions } from '@material-ui/core';

it("renders correctly", ()=>{
    const { getByTestId }= render(<SketchWidget/>)
    const element = getByTestId('toggleBtn')
    expect(element).toBeTruthy();
    // expect(queryByTestId("")).toBeTruthy();
})