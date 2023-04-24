namespace Hico.Models.ResultModels
{
    public class TaskResult
    {
        public TaskDto Task { get; set; }
        public bool success { get; set; }
        public string Message { get; set; }
    }
}
