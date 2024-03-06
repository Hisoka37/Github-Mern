import { useCallback, useEffect, useState } from "react"
import ProfileInfo from "../components/ProfileInfo"
import Repos from "../components/Repos"
import Search from "../components/Search"
import SortRepos from "../components/SortRepos"
import toast from 'react-hot-toast';


const HomePage = () => {
  const [userProfile, setUserProfile] = useState(null)
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [sortType, setSortType] = useState('forks')


  const getUserProfileAndRepos = useCallback(
    async () => {
      setLoading(true)
        try {
          const userRes = await fetch('https://api.github.com/users/hisoka37')
          const userProfile = await userRes.json()
          console.log(userProfile)
          setUserProfile(userProfile)
  
          const userRepos = await fetch(userProfile.repos_url)
          const repos = await userRepos.json()
          setRepos(repos)
     
        } catch (error) {
          toast.error(error.message)
        } finally {
          setLoading(false)
        }
  }, [])

  useEffect(() => {
      getUserProfileAndRepos()
  }, [getUserProfileAndRepos])

  return (
     <div className="m-4">
      <Search />
      <SortRepos />
        <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
          <ProfileInfo  userProfile={userProfile}/>
          <Repos />
        </div>
     </div>
  )
}

export default HomePage