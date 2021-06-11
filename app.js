$(document).ready(()=>{

    $('#searchForm').on('submit',(event)=>{
        let searchText=$('#searchText').val();
        let selected=$('#selected').val();
        getMeaning(searchText,selected);
        event.preventDefault();
				 
            });

        });


    function getMeaning(searchText,selected){
        
        axios.get(`https://api.dictionaryapi.dev/api/v2/entries/${selected}/${searchText}`)
        .then((response)=>{
            console.log(response);
            let result=`<h3 class="well text-center">Word:${searchText}</h3><br><br><br>`;
            let meaning=response.data[0].meanings.map((mean)=>{
                result+=`
               
                <br><br><h3 class="well text-center">Part Of Speech:${mean["partOfSpeech"]}</h3>
                `;
                let def=mean.definitions.map((means)=>{
                     result+=`
                     <div class="well text-center">
                         <h3>Meaning:${means["definition"]}</h3>
                         <h3>Example:${means["example"]}</h3>
                         <h3>Synonyms:${means["synonyms"]}</h3>
                    </div>
                    <br>
                     `;   
                })
                
            });
            
            $('#meaning').html(result);
        })
        .catch((err)=>{
            console.log(err);
        });
    
    }