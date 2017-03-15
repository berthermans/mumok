using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using SocketIO;

public class PlayerController : MonoBehaviour {
    
    public bool isLocalPlayer = true;
    public SocketIOComponent socket;
    
    Vector3 oldPosition;
    Vector3 currentPosition;
    Quaternion oldRotation;
    Quaternion currentRotation;

    // Use this for initialization
    void Start () {
        oldPosition         = transform.position;
        currentPosition     = oldPosition;
        oldRotation         = transform.rotation;
        currentRotation     = oldRotation;

        socket.On("avatarMove", PlayerMove);

        StartCoroutine(ConnectToServer());
    }

    IEnumerator ConnectToServer()
    {
        yield return new WaitForSeconds(0.5f);

        string positionData = JsonUtility.ToJson(new PositionJSON(transform.position));
        socket.Emit("avatarInit", new JSONObject(positionData));
        Debug.Log("avatarInit");
    }

	// Update is called once per frame
	void Update () {
        if (!isLocalPlayer)
        {
            return;
        }

        var x = Input.GetAxis("Horizontal") * Time.deltaTime * 150.0f;
        var z = Input.GetAxis("Vertical") * Time.deltaTime * 3.0f;

        transform.Rotate(0, x, 0);
        transform.Translate(0, 0, z);

        currentPosition = transform.position;
        currentRotation = transform.rotation;

        if(currentPosition != oldPosition)
        {

            string positionData = JsonUtility.ToJson(new PositionJSON(transform.position));
            socket.Emit("position", new JSONObject(positionData));
            oldPosition = currentPosition;
        }
        
	}

    void PlayerMove (SocketIOEvent socketIOEvent)
    {
        string data = socketIOEvent.data.ToString();
        
        if(data == "{\"direction\":\"left\"}")
        {
            Debug.Log("LEFT");
            transform.Translate(2, 0, 0);
        }

        if (data == "{\"direction\":\"right\"}")
        {
            Debug.Log("RIGHT");
            transform.Translate(-2, 0, 0);
        }

        if (data == "{\"direction\":\"up\"}")
        {
            Debug.Log("UP");
            transform.Translate(0, 0, -2);
        }

        if (data == "{\"direction\":\"down\"}")
        {
            Debug.Log("DOWN");
            transform.Translate(0, 0, 2);
        }
    }

    public class PositionJSON
    {
        public float[] position;

        public PositionJSON(Vector3 _position)
        {
            position = new float[] { _position.x, _position.z };
        }
    }

    public class avatarJSON
    {
        public float[] direction;

        public static avatarJSON CreateFromJSON(string data)
        {
            return JsonUtility.FromJson<avatarJSON>(data);
        }
    }
}
