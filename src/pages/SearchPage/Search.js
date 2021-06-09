import { Avatar, Grid, Paper } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import BottomNav from '../../components/BottomNav/bottomNav';
import Search from '../../components/Search/Search';
import { useSearchProfile } from '../../Services/profileActon';
import Style from '../../components/Search/Style';


const SearchPage = () =>{
    const [openResults, setOpen] = useState(false);
    const [results, setResults] = useState([]);
    const {token} = useSelector(state => state.user)
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const searchProfile = useSearchProfile();
    const mode = useSelector(state=>state.util);
    const handleSearch = (e) =>{
        e.preventDefault();
        var query = e.target.value
        if(query.length > 2){
            setLoading(true);
            searchProfile(query).then(data=>{
                setOpen(true);
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
    const classes = Style();
    
    return(
        <Paper elevation={0} className={classes.m_root} style={{backgroundColor: !mode && lightPrimary }}>
            <div className={classes.search_container}>
                <form className={classes.settayi__search}>
                    <SearchOutlined style={{alignSelf:'center'}} />
                    <input placeholder="Search for peopley" onChange={(e)=>handleSearch(e)} />
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
            </div>}
            
        </Paper>
    )
}


export default SearchPage;