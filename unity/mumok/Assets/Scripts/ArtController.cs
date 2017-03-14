using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using SocketIO;

public class ArtController : MonoBehaviour
{
    public string artName;
    public SocketIOComponent socket;
    
    // Use this for initialization
    void Start()
    {
        StartCoroutine(ConnectToServer());
    }

    IEnumerator ConnectToServer()
    {
        yield return new WaitForSeconds(0.5f);

        string positionData = JsonUtility.ToJson(new PositionJSON(transform.position));
        
        socket.Emit("artInit", new JSONObject(positionData));
    }

    public class PositionJSON
    {
        public float[] position;

        public PositionJSON(Vector3 _position)
        {
            position = new float[] { _position.x, _position.z };
        }
    }
}
