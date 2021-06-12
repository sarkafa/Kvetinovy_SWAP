// import { flowers } from '.././flowers';
// import React, { useEffect, useState } from 'react';
// import './style.css';

// const SuggestionsList = (props) => {
//   const {
//     suggestions,
//     inputValue,
//     onSelectSuggestion,
//     displaySuggestions,
//     selectedSuggestion,
//   } = props;

//   if (inputValue && displaySuggestions) {
//     if (suggestions.length > 0) {
//       return (
//         <ul className="suggestions-list">
//           {suggestions.map((suggestion, index) => {
//             const isSelected = selectedSuggestion === index;
//             const classname = `suggestion ${isSelected ? 'selected' : ''}`;
//             return (
//               <li
//                 key={index}
//                 className={classname}
//                 onClick={() => onSelectSuggestion(index)}
//               >
//                 {suggestion}
//               </li>
//             );
//           })}
//         </ul>
//       );
//     } else {
//       return <div>Žádné kytičky na výběr</div>;
//     }
//   }
//   return <></>;
// };
// export const Autocomplete = () => {
//   const [inputValue, setInputValue] = useState('');
//   const [filteredSuggestions, setFilteredSuggestions] = useState([]);
//   const [selectedSuggestion, setSelectedSuggestion] = useState(0);
//   const [displaySuggestions, setDisplaySuggestions] = useState(false);

//   const suggestions = flowers;

//   const onChange = (event) => {
//     const value = event.target.value;
//     setInputValue(value);

//     const filteredSuggestions = suggestions.filter((suggestion) =>
//       suggestion.toLowerCase().includes(value.toLowerCase()),
//     );

//     setFilteredSuggestions(filteredSuggestions);
//     setDisplaySuggestions(true);
//   };

//   const onSelectSuggestion = (index) => {
//     setSelectedSuggestion(index);
//     setInputValue(filteredSuggestions[index]);
//     setFilteredSuggestions([]);
//     setDisplaySuggestions(false);
//   };

//   return (
//     <>
//       <input
//         className="user-input"
//         type="text"
//         onChange={onChange}
//         value={inputValue}
//       />
//       <SuggestionsList
//         inputValue={inputValue}
//         selectedSuggestion={selectedSuggestion}
//         onSelectSuggestion={onSelectSuggestion}
//         displaySuggestions={displaySuggestions}
//         suggestions={filteredSuggestions}
//       />
//     </>
//   );
// };
