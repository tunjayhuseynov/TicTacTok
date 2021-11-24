import { useState, useRef, useEffect } from 'react';
import { generate } from 'shortid';
import Squard from './squard';

const Main = (props) => {
	const [ Map, setMap ] = useState([ [ '', '', '' ], [ '', '', '' ], [ '', '', '' ] ]);

	const XrO = useRef('x');

	const onClick = (x, y) => {
		const newArr = Map.reduce((a, element, index) => {
			if (x === index) {
				if (element[y] === '') {
					element[y] = XrO.current;
					XrO.current = XrO.current === 'x' ? 'o' : 'x';
				}
			}
			a.push(element);
			return a;
		}, []);
		setMap(newArr);
	};

	useEffect(
		() => {
			for (let index = 0; index < Map.length; index++) {
				const unique = [ ...new Set(Map[index]) ];
				if (unique.length === 1 && Map[index][0] !== '') {
					alert('Win');
				}
			}

			for (let q = 0; q < Map.length; q++) {
				const values = [];
				for (let index = 0; index < Map[q].length; index++) {
					values.push(Map[index][q]);
				}
				Checker(values, values[0]);
			}

			const values = [];
			const reverseValues = [];
			for (let index = 0; index < Map.length; index++) {
				for (let q = Map[index].length - 1; q >= 0; q--) {
					if (index === q) {
						values.push(Map[index][q]);
					}
				}

				const x = index;
				const y = Map.length - 1 - index;
				reverseValues.push(Map[x][y]);
			}
			Checker(values, values[0]);
			Checker(reverseValues, reverseValues[0]);
		},
		[ Map ]
	);

	const Checker = (arr, ilkValue) => {
		const unique = [ ...new Set(arr) ];
		if (unique.length === 1 && ilkValue !== '') {
			alert('Win');
		}
	};

	return (
		<div className="grid grid-cols-3 grid-rows-3 px-40" style={{ width: '625px', height: '300px' }}>
			{Map.map((arr, x) =>
				arr.map((element, y) => <Squard key={generate()} info={element} onClick={() => onClick(x, y)} />)
			)}
		</div>
	);
};

export default Main;
