using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using SocketIO;

public class NetworkManager : MonoBehaviour {

    public static NetworkManager instance;
    public Canvas canvas;
    public SocketIOComponent socket;
    public GameObject player;

	// Use this for initialization
	void Start () {
        ConnectToServer();

    }

    #region Commands

    IEnumerator ConnectToServer()
    {
        yield return new WaitForSeconds(0.5f);

        socket.Emit("unityConnect");

        //yield return new WaitForSeconds(1);

        
    }

    #endregion

    #region Listening

    #endregion

    #region JSONMessageClasses

    public class PositionJSON
    {
        public float[] position;

        public PositionJSON(Vector3 _position)
        {
            position = new float[] { _position.x, _position.y, _position.z };
        }
    }

    public class RotationJSON
    {
        public float[] rotation;

        public RotationJSON(Quaternion _rotation)
        {
            rotation = new float[] { _rotation.eulerAngles.x, _rotation.eulerAngles.y, _rotation.eulerAngles.z };
        }
    }
    #endregion
    
}
