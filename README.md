# back-end

- setting up project

- current endpoints

* some title

  <table>
    <thead>
      <tr>
        <th>Rest Methods</th>
        <th>Api Endpoints</th>
        <th>Required Keys</th>
        <th>Returned values</th>
        <th>token Required?</th>
      </tr>
    </thead>
    <tbody>
        <tr>
            <td>Post</td>
            <td>/api/register</td>
            <td><code>{username: "", password: ""}</code></td>
            <td>username</td>
            <td>no</td>
        </tr>
        <tr>
            <td>Post</td>
            <td>/api/login</td>
            <td><code>{username: "", password: ""</code></td>
            <td>username, token</td>
            <td>no</td>
        </tr>
        <tr>
        <td>Post</td>
        <td>/api/cannabis/save</td>
        <td><code>{name: "", type: "", flavors: "", effects:"", description: "", rating: ""}<code></td>
        <td>users id, strain index, type, flavors, effescts, description, rating</td>
        <td>yes</td>
        </tr>
        <tr>
        <td>Get</td>
        <td>/api/cannabis</td>
        <td></td>
        <td>index, name, type, flavors, effect, description, rating</td>
        <td>yes</td>
        </tr>
        <tr>
        <td>Post</td>
        <td>/api/logout</td>
        <td></td>
        <td>Username has logged out</td>
        <td>yes</td>
        </tr>
    </tbody>
  </table>
