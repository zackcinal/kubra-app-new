import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut } from '../../Services/users.js'

function SignOut({setUser}) {
  const navigate = useNavigate()

  useEffect(() => {
    const signOutUser = async () => {
      await signOut()
      setUser(null)
      navigate('/')
    }
    signOutUser()
  }, [])

  return ''
}

export default SignOut