import dotenv from 'dotenv'
import colors from 'colors'

dotenv.config();

const PORT =  process.env.port ? Number(process.env.port) : 3001

export function getDatabaseURI() {
    const dbUser = process.env.DATABASE_USER || 'postgres'
    const dbPass = process.env.DATABASE_PASS ? encodeURI(process.env.DATABASE_PASS) : 'postgres'
    const dbHost = process.env.DATABASE_HOST || 'localhost'
    const dbPort = process.env.DATABASE_PORT || 5432
    const dbName = process.env.DATABASE_NAME || 'life_tracker'

    return process.env.DATABASE_URL || `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
}


// console.log("process.env".yellow, Object.keys(process.env))
console.log("LifeTracker Config:".red)
console.log("PORT:".blue, PORT)
console.log("Database URI:".blue, getDatabaseURI())
console.log('---')

export default PORT