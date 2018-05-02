$(document).ready(function(){
    $('#searchUser').on('keyup',function(e){
       let username = e.target.value;
       // make ajax call to github
       $.ajax({
           url:'https://api.github.com/users/'+username,
           data : {
               client_id : 'Iv1.56d849949fb2944b',
               client_secret : '5d140340d4971eefc4e4cdd08c2a3943de2e2076'
           }
       }).done(function(user){
           // making request for repos
           $.ajax({
                url : 'https://api.github.com/users/'+username+'/repos',
                data : {
                client_id : 'Iv1.56d849949fb2944b',
                client_secret : '5d140340d4971eefc4e4cdd08c2a3943de2e2076',
                sort : 'created : asc',
                per_page : 5
           }
           }).done(function(repos){
               // loop through repos
               $.each(repos, function(index,repo){
                   $('#repos').append(`
                   <div class="well">
                   <div class="row">
                    <div class="col-md-7">
                        <div class>${repo.name} </strong> : ${repo.description}
                    </div>
                      <div class="col-md-3">
                       <span class="label label-default">Forks : ${repo.forks_count}</span>
                    <span class="label label-primary">Watchers : ${repo.watchers_count}</span>
                    <span class="label label-success">Stars : ${repo.stargazers_count}</span>
                    
                    </div>
                      <div class="col-md-3">
                      <a href="${repo.html_url}" class="btn btn-default" target="_blank">View Repo</a>
                    </div>
                   </div>
                   </div>
                   `)
               })
           });
       
       $('#profile').html(
           `
            <div class="panel panel-default">
            <div class="panel-heading">
                <h3 class="panel-title">${user.name}</h3>
            </div>
            <div class="panel-body">
               <div class="row">
                    <div class="col-md-3">
                    <img  class="thumbnail avatar" src="${user.avatar_url}">
                    <a target="_blank" class="btn btn-primary btn-block"  href="${user.html_url}">View profile</a>
                    </div>
                    <div class="col-md-9">
                    <span class="label label-default">Public repos : ${user.public_repos}</span>
                    <span class="label label-primary">Public gists : ${user.public_gists}</span>
                    <span class="label label-success">Following : ${user.following}</span>
                    <span class="label label-info">Followers : ${user.followers}</span>

                    <br>
                    <br>
                    
                    <ul class="list-group">
                    <li class="list-group-item">Company : ${user.company}</li>
                    <li class="list-group-item">Website : ${user.blog}</li>
                    <li class="list-group-item">Location : ${user.location}</li>
                    <li class="list-group-item">Member since : ${user.created_at}</li>
                    </ul>

                    </div>
               </div>
            </div>
            </div>
            <h3 class="page-header">Latest Repos</h3>
            <div id="repos"></div>
            `
       )
       });
    })
})
