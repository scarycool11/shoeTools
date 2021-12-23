let profiles

export default class profilesDao {
    static async injectDB(conn) {
        if (profiles) {
            return
        }
        try {
            profiles = await conn.db(process.env.RESTUSERS_NS).collection("profiles")
        } catch(e) {
            console.error(
               'unable to establish a collection handle in profilesDAO: ${e}' 
            )
        }
    }


    static async getProfiles( {
        filters = null,
        page = 0,
        profilesPerPage = 10
    } = {}) {
        let query 
        if (filters) { //filter search in query
            if ("name in filters") {
                query = { $text: { $search: filters["name"] } } //specify which fields will be searched in mongodb database, sprcify in mongodb
            }   else if ("website" in filters) {
                query = {"website": {$eq: filters["website"] } }
            }
       }
   
   
       let cursor 

       try {
        cursor = await profiles //match all profiles matched on profiles query
            .find(query)
       } catch (e) {
           console.error('unable to issue find command, ${e}')
           return { profilesList: [], totalNumProfiles: 0 }  //catch error if empty query
       }
       
       const displayCursor = cursor.limit(profilesPerPage).skip(profilesPerPage * page)

       try{
        const profilesList = await displayCursor.toArray()
        const totalNumProfiles = await profiles.countDocuments(query)

        return { profilesList, totalNumProfiles }                      //display results
        } catch (e) {
          console.error(
              'unable to convert cursor to array or problem counting documents, ${e} ',
          )
            return { profilesList: [], totalNumProfiles: 0 }
        }
    }
}