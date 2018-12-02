node{
   stage('Checkoutscm'){
      checkout scm
   }
   stage('build'){
       echo 'pipeline'
       gradle{
          tasks ('clean')
          tasks ('build')
       }
   }

}