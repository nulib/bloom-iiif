import React from "react";

interface Props {
  collectionId: string;
}

const App: React.FC<Props> = (props) => (
  <>ok</>
  // <CollectionProvider>
  //   <Bloom {...props} />
  // </CollectionProvider>
);

// const Bloom: React.FC<Props> = ({ collectionId }) => {
//   const store = useCollectionState();
//   const { vault } = store;
//   const [collection, setCollection] = useState<CollectionNormalized>();
//   /**
//    * todo: add wrapping context and store vault
//    */
//   useEffect(() => {
//     /**
//      * load collection using @iiif/vault
//      */

//     vault
//       .loadCollection(collectionId)
//       .then((data: any) => setCollection(data))
//       .catch((error: any) => {
//         console.error(`Collection failed to load: ${error}`);
//       })
//       .finally(() => {});
//   }, []);

//   if (!collection || !collection.items) {
//     console.log(`The IIIF Collection ${collectionId} failed to load.`);
//     return <></>;
//   }

//   if (collection.items.length === 0) {
//     console.log(`The IIIF collection ${collectionId} does not contain items.`);
//     return <></>;
//   }

//   return (
//     <StyledBloom>
//       <Header
//         label={collection.label as InternationalString}
//         summary={collection.summary}
//         homepage={collection.homepage as any as ContentResource[]}
//       />
//       <Items items={collection.items as CollectionItems[]} />
//     </StyledBloom>
//   );
// };

// const StyledBloom = styled("div", { padding: "$4 0" });

export default App;
