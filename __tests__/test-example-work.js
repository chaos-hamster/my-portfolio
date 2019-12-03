import React from 'react';
import { shallow } from 'enzyme';
import ExampleWork, { ExampleWorkBubble } from '../js/example-work';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


Enzyme.configure({ adapter: new Adapter() });

const myWork = [
    {
        'title': 'Work Example 1',
        'image': {
            'desc': 'example screenshot of a project involving code',
            'src': 'images/example1.png',
            'comment': ``
        }
    },
    {
        'title': 'Work Example 2',
        'image': {
            'desc': 'example screenshot of a project involving chemistry',
            'src': 'images/example2.png',
            'comment': `“Chemistry” by Surian Soosay is licensed under CC BY 2.0 
            https://www.flickr.com/photos/ssoosay/4097410999`
        }
    }];

describe("Examplework component", () =>
{
    let component = shallow(<ExampleWork work={myWork}/>);
    it("Should be a 'span' element", () => {
        //console.log(component.debug());
        expect(component.type()).toEqual('span');
    });

    it ("Should contain as many children as there are work examples", () => {
        expect(component.find("ExampleWorkBubble").length).toEqual(myWork.length);
    });

    it('Should allow the modal to open and close.', () => {
        component.instance().openModal();
        expect(component.instance().state.modalOpen).toBe(true);

        component.instance().closeModal();
        expect(component.instance().state.modalOpen).toBe(false);
    });
});

describe("ExampleworkBubble component", () =>
{
    let mockOpenFn = jest.fn();

    let component = shallow(<ExampleWorkBubble example={myWork[1]} openModal={mockOpenFn}/>);
    let images = component.find("img");

    it("Should contain a single 'img' element", () => {
        //console.log(component.debug());
        expect(images.length).toEqual(1);
    });

    it("Should have the img src set correctly", () => {
        expect(images.prop('src')).toEqual(myWork[1].image.src)
    });

    it("Should call the openModal handler when clicked", () => {
        component.find('.section__exampleWrapper').simulate('click');
        expect(mockOpenFn).toHaveBeenCalled();
    });
});