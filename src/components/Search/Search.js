import { Avatar, Paper } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Style from './Style';
import { BaseColor, lightPrimary } from "../../assets/Colors";
import { useHistory } from 'react-router';
import { useSearchProfile } from '../../Services/profileActon';
import { PROFILE_SEARCH_INITIAL_COUNT } from '../../Services/utils';


const Search = () =>{
    const [openResults, setOpen] = useState(false);
    const [seemore, setSeeMore] = useState(false);
    const [size, setSize] = useState(0);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const {token} = useSelector(state => state.user)
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const searchProfile = useSearchProfile();
    const classes = Style()
    const mode = useSelector(state=>state.util);

    const apiSearch = async (query) =>{
        if(query.length > 2){
            setLoading(true);
            searchProfile(query, size).then(data=>{
                setOpen(true);
                console.log(data.results.length, "ppp")
                if(data.results.length === PROFILE_SEARCH_INITIAL_COUNT){
                    setSeeMore(true);
                }
                setResults(data.results)
            })
            .catch(e=>{
                setLoading(false);
                setOpen(false);
            })
        
        }
        else{
            setResults([]);
            setOpen(false);
        }
    }

    const handleSearch = (e) =>{
        e.preventDefault();
        setQuery(e.target.value);
        apiSearch(query);
    }
    
    const handleSeeMore = () =>{
        setSize(prevSize=>prevSize+20);
        apiSearch(query)
    }
    return(
        <Paper elevation={0} className={classes.root} style={{backgroundColor: !mode && lightPrimary }}>
            <div className={classes.search_container}>
                <form className={classes.settayi__search}>
                    <SearchOutlined style={{alignSelf:'center'}} />
                    <input placeholder="Search for peopley" value={query} onChange={(e)=>handleSearch(e)} />
                </form>
            </div>
            {openResults&&<div className={classes.results_container}>
            {results.map(item=>(
                <div className={classes.search_items} onClick={()=>{
                    localStorage.setItem('current_profile_id', item.id);
                    history.push({pathname:`/${item.first_name}`, state:{id:item.id}})
                
                    }}>
                    <Avatar src={item.profile_picture} style={{alignSelf:'center'}}/>
                    <p>{item.first_name}{" "}{item.last_name}</p>
                </div>
                
            ))}
            {seemore&&<div style={{display:'flex',width:'100%', justifyContent:'center'}}>
                    <h4 onClick={handleSeeMore} style={{cursor:'pointer', color:"lightgray"}}>See more</h4>
                </div>}
            </div>}
            
            
        </Paper>
    )
}

export default Search;